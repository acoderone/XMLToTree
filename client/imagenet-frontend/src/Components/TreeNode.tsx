import React from 'react';
import { TreeNode as TreeNodeType } from '../types/TreeNode';

interface TreeNodeProps {
  node: TreeNodeType;
  searchQuery: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, searchQuery }) => {
  const highlight = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div style={{ paddingLeft: '20px' }}>
      <div>
        <strong>Name:</strong> {highlight(node.name, searchQuery)}
        {' | '}
        <strong>Size:</strong> {node.size}
      </div>
      {node.children.length > 0 && (
        <div>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} searchQuery={searchQuery} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
