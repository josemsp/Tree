import { useState } from "react";

const TreeNode = ({ node, children, father, addChildren, canDelete, deleteChildren, addInput }) => {
  const [text, setText] = useState('')

  const handleText = (event) => {
    const value = event.target.value;
    setText(value)
  }

  const handleKeyUp = (event) => {
    const keycode = event.keyCode;
    const code = event.code;

    if (text !== '' && (keycode === '13' || code === 'Enter')) {
      addChildren({ father: node, nodeToFind: text })
      setText('')
    }
  }

  const handleDelete = () => {
    deleteChildren({ father, nodeToFind: node })
  }

  const handleAddInput = () => {
    addInput({ father, nodeToFind: node })
  }


  return (
    <>
      {node}
      {canDelete && <div className="options">
        <span role="img" aria-label="cross" onClick={handleDelete}>❌</span>
        {/* {!children && <span role="img" aria-label="cross" onClick={handleAddInput}>➕</span>} */}
      </div>
      }

      {children &&
        children.map((_node) => (
          <div key={_node.node} className="indent">
            <TreeNode
              {..._node}
              father={node}
              addChildren={addChildren}
              canDelete={true}
              deleteChildren={deleteChildren}
              addInput={addInput}
            />
          </div>
        ))}
      {children && <input type="text" value={text} onChange={handleText} onKeyUp={handleKeyUp} />}
    </>
  );
};

export default TreeNode;
