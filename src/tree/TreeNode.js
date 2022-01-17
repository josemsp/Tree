import { useState } from "react";

const TreeNode = ({ node, children, showInput, father, addChildren, canDelete, deleteChildren }) => {
  const [text, setText] = useState('')

  const handleText = (event) => {
    const value = event.target.value;
    setText(value)
  }

  const handleKeyUp = (event) => {
    const keycode = event.keyCode;
    const code = event.code;

    if (keycode === '13' || code === 'Enter') {
      addChildren({ father, nodeToFind: text })
      setText('')
    }
  }

  const handleDelete = () => {
    deleteChildren({ father, nodeToFind: node })
  }

  return (
    <>
      {node}
      {canDelete &&
        <span role="img" aria-label="cross" onClick={handleDelete}>❌</span>
      }

      {children &&
        children.map((_node, index) => (
          <div key={_node.node} className="indent">
            <TreeNode
              {..._node}
              showInput={children.length - 1 === index}
              father={node}
              addChildren={addChildren}
              canDelete={true}
              deleteChildren={deleteChildren}
            />
          </div>
        ))}
      {showInput && <input type="text" value={text} onChange={handleText} onKeyUp={handleKeyUp} />}
    </>
  );
};

export default TreeNode;
