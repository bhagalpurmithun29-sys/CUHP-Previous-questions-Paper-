import { School } from '../models/school.model';
import { Department } from '../models/department.model';
import { Course } from '../models/course.model';
import { Semester } from '../models/semester.model';
import { Subject } from '../models/subject.model';
import { SavedSearch } from '../models/savedSearch.model';
import { SearchAnalytics } from '../models/searchAnalytics.model';
import { EntityType, ISearchResult, SearchQueryDto } from '../interfaces/search.interface';
import { Types } from 'mongoose';

export class SearchRepository {
  async logSearchAnalytics(analyticsData: any) {
    return await SearchAnalytics.create(analyticsData);
  }

  async saveSearch(userId: Types.ObjectId | string, query: string, filters: any = {}) {
    const existingSearch = await SavedSearch.findOne({ userId, query });
    if (existingSearch) {
      existingSearch.lastSearchedAt = new Date();
      existingSearch.filters = filters;
      return await existingSearch.save();
    }
    return await SavedSearch.create({ userId, query, filters });
  }

  async getRecentSearches(userId: Types.ObjectId | string, limit = 10) {
    return await SavedSearch.find({ userId })
      .sort({ lastSearchedAt: -1 })
      .limit(limit);
  }

  async getPinnedSearches(userId: Types.ObjectId | string) {
    return await SavedSearch.find({ userId, isPinned: true })
      .sort({ lastSearchedAt: -1 });
  }

  async togglePinSearch(userId: Types.ObjectId | string, searchId: string) {
    const search = await SavedSearch.findOne({ _id: searchId, userId });
    if (search) {
      search.isPinned = !search.isPinned;
      await search.save();
      return search;
    }
    return null;
  }

  async deleteRecentSearches(userId: Types.ObjectId | string) {
    return await SavedSearch.deleteMany({ userId, isPinned: false });
  }

  private buildSearchQuery(query: string) {
    if (!query) return {};
    
    // For partial and prefix match, we use regex. For exact, we can use quotes.
    // Given the requirement for "MongoDB Text Search", we try text search first, 
    // and fallback/combine with regex for partial matching.
    const regexQuery = new RegExp(query, 'i');
    
    return {
      $or: [
        { $text: { $search: query } },
        // These fields are common across our entities or we'll map them
        { schoolName: regexQuery },
        { departmentName: regexQuery },
        { courseName: regexQuery },
        { semesterName: regexQuery },
        { subjectName: regexQuery },
        { shortName: regexQuery }
      ]
    };
  }

  async globalSearch(params: SearchQueryDto): Promise<{ results: ISearchResult[], total: number }> {
    const { query, type, page = 1, limit = 10, filters = {} } = params;
    const skip = (page - 1) * limit;
    
    // If no query and no filters, return empty
    if (!query && Object.keys(filters).length === 0) {
      return { results: [], total: 0 };
    }

    const searchPromises: Promise<ISearchResult[]>[] = [];

    // Helper to execute search on a model and map to standard ISearchResult
    const executeSearch = async (
      model: any, 
      entityType: EntityType, 
      nameField: string, 
      descField: string, 
      routePrefix: string,
      extraQuery: any = {}
    ): Promise<ISearchResult[]> => {
      const matchQuery = { ...extraQuery, isDeleted: false };
      
      if (query) {
        matchQuery.$or = [
          { $text: { $search: query } },
          { [nameField]: new RegExp(query, 'i') },
          ...(model.schema.paths.shortName ? [{ shortName: new RegExp(query, 'i') }] : []),
          ...(model.schema.paths[`${entityType}Code`] ? [{ [`${entityType}Code`]: new RegExp(query, 'i') }] : [])
        ];
      }

      const docs = await model
        .find(matchQuery, { score: { $meta: 'textScore' } })
        .sort(query ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
        .limit(limit)
        .lean();

      return docs.map((doc: any) => ({
        id: doc._id.toString(),
        entityType,
        title: doc[nameField],
        subtitle: doc.shortName || doc[`${entityType}Code`],
        description: doc[descField]?.substring(0, 150),
        url: `/${routePrefix}/${doc._id}`,
        score: doc.score || 0,
      }));
    };

    if (!type || type === EntityType.SCHOOL) {
      searchPromises.push(executeSearch(School, EntityType.SCHOOL, 'schoolName', 'description', 'schools', filters.school ? { _id: filters.school } : {}));
    }
    if (!type || type === EntityType.DEPARTMENT) {
      searchPromises.push(executeSearch(Department, EntityType.DEPARTMENT, 'departmentName', 'description', 'departments', filters.department ? { _id: filters.department } : {}));
    }
    if (!type || type === EntityType.COURSE) {
      searchPromises.push(executeSearch(Course, EntityType.COURSE, 'courseName', 'description', 'courses', filters.course ? { _id: filters.course } : {}));
    }
    if (!type || type === EntityType.SEMESTER) {
      // Semester doesn't have a specific description field usually, maybe academicSession
      searchPromises.push(executeSearch(Semester, EntityType.SEMESTER, 'semesterName', 'academicSession', 'semesters', filters.semester ? { _id: filters.semester } : {}));
    }
    if (!type || type === EntityType.SUBJECT) {
      searchPromises.push(executeSearch(Subject, EntityType.SUBJECT, 'subjectName', 'description', 'subjects', filters.subject ? { _id: filters.subject } : {}));
    }

    const resultsArray = await Promise.all(searchPromises);
    
    // Flatten and sort by score
    let allResults = resultsArray.flat();
    
    if (query) {
       allResults.sort((a, b) => (b.score || 0) - (a.score || 0));
    }

    const total = allResults.length;
    // Apply combined pagination
    const paginatedResults = allResults.slice(skip, skip + limit);

    return { results: paginatedResults, total };
  }

  async autocomplete(query: string, limit = 5): Promise<ISearchResult[]> {
    if (!query || query.length < 2) return [];

    const searchPromises: Promise<ISearchResult[]>[] = [];
    const regexQuery = new RegExp(`^${query}|${query}`, 'i'); // Prefix or partial match

    const executeAutocomplete = async (model: any, entityType: EntityType, nameField: string, routePrefix: string): Promise<ISearchResult[]> => {
      const docs = await model.find(
        { 
          isDeleted: false,
          $or: [
            { [nameField]: regexQuery },
            ...(model.schema.paths.shortName ? [{ shortName: regexQuery }] : [])
          ]
        },
        { [nameField]: 1, shortName: 1 }
      ).limit(limit).lean();

      return docs.map((doc: any) => ({
        id: doc._id.toString(),
        entityType,
        title: doc[nameField],
        subtitle: doc.shortName,
        url: `/${routePrefix}/${doc._id}`,
      }));
    };

    searchPromises.push(executeAutocomplete(School, EntityType.SCHOOL, 'schoolName', 'schools'));
    searchPromises.push(executeAutocomplete(Department, EntityType.DEPARTMENT, 'departmentName', 'departments'));
    searchPromises.push(executeAutocomplete(Course, EntityType.COURSE, 'courseName', 'courses'));
    searchPromises.push(executeAutocomplete(Subject, EntityType.SUBJECT, 'subjectName', 'subjects'));

    const resultsArray = await Promise.all(searchPromises);
    return resultsArray.flat().slice(0, limit * 2); // Return top results across all types
  }
}
