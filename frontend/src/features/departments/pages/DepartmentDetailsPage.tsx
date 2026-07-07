import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiArrowLeft, FiMail, FiPhone, FiGlobe, FiMapPin, FiUser, FiInfo } from 'react-icons/fi';
import { useDepartment } from '../hooks/useDepartment';
import { DEPARTMENT_CONSTANTS } from '../constants/department.constants';

export const DepartmentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: department, isLoading } = useDepartment(id!);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-r-transparent"></div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-900">Department Not Found</h2>
        <p className="mt-2 text-gray-500">The department you're looking for does not exist or has been deleted.</p>
        <button
          onClick={() => navigate(DEPARTMENT_CONSTANTS.ROUTES.LIST)}
          className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Back to Departments
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to={DEPARTMENT_CONSTANTS.ROUTES.LIST}
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <FiArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Department Details</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-200"
      >
        <div className="border-b border-gray-200 px-6 py-6 sm:px-8 bg-gray-50 flex justify-between items-start">
          <div className="flex items-center">
            {department.logo ? (
              <img src={department.logo} alt={department.departmentName} className="h-16 w-16 rounded-lg object-cover border border-gray-200" />
            ) : (
              <div className="h-16 w-16 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold border border-indigo-200">
                {department.departmentName.charAt(0)}
              </div>
            )}
            <div className="ml-5">
              <h2 className="text-xl font-bold text-gray-900">{department.departmentName}</h2>
              <p className="text-sm text-gray-500 mt-1">Code: <span className="font-medium text-gray-900">{department.departmentCode}</span></p>
              {department.shortName && (
                <p className="text-sm text-gray-500">Short Name: <span className="font-medium text-gray-900">{department.shortName}</span></p>
              )}
            </div>
          </div>
          <Link
            to={DEPARTMENT_CONSTANTS.ROUTES.EDIT(department._id)}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FiEdit2 className="mr-2 h-4 w-4 text-gray-400" />
            Edit
          </Link>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500">
                <FiInfo className="mr-2 h-4 w-4" /> Status
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                  ${department.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                    department.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}`}
                >
                  {department.status.toLowerCase()}
                </span>
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500">
                <FiInfo className="mr-2 h-4 w-4" /> School
              </dt>
              <dd className="mt-1 text-sm text-gray-900 font-medium">
                {/* @ts-ignore */}
                {department.schoolId?.schoolName} ({department.schoolId?.schoolCode})
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500">
                <FiUser className="mr-2 h-4 w-4" /> Head of Department
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{department.hodName || 'Not Assigned'}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500">
                <FiMail className="mr-2 h-4 w-4" /> Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {department.email ? (
                  <a href={`mailto:${department.email}`} className="text-indigo-600 hover:text-indigo-500">{department.email}</a>
                ) : 'N/A'}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500">
                <FiPhone className="mr-2 h-4 w-4" /> Phone
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{department.phone || 'N/A'}</dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500">
                <FiGlobe className="mr-2 h-4 w-4" /> Website
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {department.website ? (
                  <a href={department.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">{department.website}</a>
                ) : 'N/A'}
              </dd>
            </div>

            <div className="sm:col-span-1">
              <dt className="flex items-center text-sm font-medium text-gray-500">
                <FiMapPin className="mr-2 h-4 w-4" /> Office Location
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{department.officeLocation || 'N/A'}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 max-w-3xl whitespace-pre-wrap">
                {department.description || 'No description provided.'}
              </dd>
            </div>
          </dl>
        </div>
      </motion.div>
    </div>
  );
};

export default DepartmentDetailsPage;
