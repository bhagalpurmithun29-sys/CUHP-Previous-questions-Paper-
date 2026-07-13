# Knowledge Graph Models

## 1. Overview
The Knowledge Graph stores relationships between Academic Entities, enabling advanced semantic discovery and recommendations. It is hosted in a Graph Database (e.g., Neo4j).

## 2. Core Entities (Nodes)
* **Academic Entities**: `Course`, `Subject`, `Department`, `Program`.
* **People**: `Faculty`, `Student`.
* **Repository Assets**: `QuestionPaper`, `Syllabus`, `StudyMaterial`.

## 3. Core Relationships (Edges)
* `Faculty` - [TEACHES] -> `Course`
* `Course` - [BELONGS_TO] -> `Department`
* `QuestionPaper` - [ASSESSES] -> `Course`
* `Student` - [ENROLLED_IN] -> `Program`

## 4. Graph Exploration (Use Cases)
By traversing the graph, the search engine can answer complex implicit queries:
* **Query**: "Show me all Question Papers for courses taught by Dr. Smith in the Science Department."
* **Traversal**: `Faculty(Dr. Smith)` -> [TEACHES] -> `Course` -> [BELONGS_TO] -> `Department(Science)` AND `Course` <- [ASSESSES] - `QuestionPaper`.
