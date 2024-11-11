export default function generateFilesTree(arrayOfFiles) {
  const tree = []; // Initialize the main tree as an array
  const pathMap = {}; // A map to keep track of nodes by their path

  arrayOfFiles.forEach((item) => {
    const parts = item.relativePath.split('/');
    const depth = item.depth;

    // Build the current node
    const node = { ...item, children: [] };

    if (node.pathType === 'file') {
      node.language = getLanguage(node.name);
    }

    // Add the node to the path map
    pathMap[item.relativePath] = node;

    if (depth === 0) {
      // Top-level node, add it directly to the tree
      tree.push(node);
    } else {
      // Find the parent path and add this node as a child
      const parentPath = parts.slice(0, -1).join('/');
      const parent = pathMap[parentPath];
      if (parent) {
        parent.children.push(node);
      }
    }
  });

  return tree;
}

export function getLanguage(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'py':
      return 'python';
    case 'js':
      return 'javascript';
    case 'ts':
      return 'typescript';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'sql':
      return 'sql';
    case 'yml':
      return 'yaml';
    case 'yaml':
      return 'yaml';
    case 'log':
      return 'log';
    case 'gitignore':
      return 'git';
    case 'gitkeep':
      return 'git';
    default:
      return null;
  }
}
