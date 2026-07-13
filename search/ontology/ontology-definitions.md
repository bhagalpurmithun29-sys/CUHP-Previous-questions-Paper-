# Ontology & Taxonomy Definitions

## 1. Overview
The Ontology module manages the hierarchical concepts and business terms that structure the search experience, acting as an extension of the Business Glossary.

## 2. Academic Taxonomy
The hierarchical structure of the university:
`University -> Faculty/School -> Department -> Program -> Course -> Module`

## 3. Synonym & Concept Mapping
To improve recall, the search engine utilizes predefined synonym rings:
* "CS", "Computer Science", "CompSci"
* "First Year", "Freshman", "Sem 1 & 2"

## 4. Concept Relationships (Broader/Narrower)
* **Broader**: `Artificial Intelligence` is broader than `Machine Learning`.
* **Narrower**: `Neural Networks` is narrower than `Machine Learning`.
* **Implementation**: If a user searches for "AI Papers", the semantic engine expands the query to automatically include papers tagged with the narrower concepts (Machine Learning, Neural Networks).
