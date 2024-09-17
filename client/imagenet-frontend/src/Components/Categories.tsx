import React, { useEffect, useState, useMemo } from 'react';
import TreeNode from './TreeNode';
import { TreeNode as TreeNodeType } from '../types/TreeNode';
import "../TreeNode.css"
const CategoriesTree: React.FC = () => {
  const [categories, setCategories] = useState<TreeNodeType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  useEffect(() => {
    fetch('/api/categories')  // Fetch the categories from backend
      .then(response => response.json())
      .then(data => setCategories([data]))  // Wrap root category in array
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);  // 300ms debounce time

    return () => clearTimeout(handler);  // Cleanup timeout on each re-render
  }, [searchQuery]);

  // Filter the tree based on the debounced search query
  const filteredCategories = useMemo(() => {
    const filterTree = (nodes: TreeNodeType[], query: string): TreeNodeType[] => {
      return nodes
        .map(node => ({
          ...node,
          children: node.children ? filterTree(node.children, query) : [],
        }))
        .filter(node => node.name.toLowerCase().includes(query.toLowerCase()) || node.children.length > 0);
    };

    return filterTree(categories, debouncedQuery);
  }, [categories, debouncedQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="tree-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {filteredCategories.map((category, index) => (
        <TreeNode key={index} node={category} searchQuery={debouncedQuery} />
      ))}
    </div>
  );
};

export default CategoriesTree;
