import "./index.css";
import dataJSON from "./data.json"
import TreeNode from "./TreeNode";
import { useEffect, useState } from "react";

export default function Tree () {
  const [data, setData] = useState(dataJSON)
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (render === true) setRender(false)
  }, [render])

  const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }

  const handleAdd = ({ father, nodeToFind }) => {
    let _data = copyObject(data)
    const result = searchInTree(_data, father, nodeToFind, addChildren)
    if (JSON.stringify(result) !== JSON.stringify(data)) {
      setData(result)
      setRender(true)
    }
  }

  const addChildren = (element, nodeToFind) => {
    let _element = copyObject(element)
    _element.children = [
      ..._element.children,
      { node: nodeToFind }
    ]
    return _element
  }

  const handleDelete = ({ father, nodeToFind }) => {
    let _data = copyObject(data)
    const result = searchInTree(_data, father, nodeToFind, deleteChildren)
    console.log(`result`, result)
    if (JSON.stringify(result) !== JSON.stringify(data)) {
      console.log(`result`, result)
      setData(result)
      setRender(true)
    }
  }

  const deleteChildren = (element, nodeToFind) => {
    let _element = copyObject(element)
    _element.children = _element.children.filter(n => n.node !== nodeToFind)
    return _element
  }

  const searchInTree = (element, name, nodeToFind, action) => {
    if (element.node === name) {
      element = { ...action(element, nodeToFind) }
      return element
    } else if (element.children !== undefined) {
      let index = 0
      let result = null
      for (index = 0; result === null && index < element.children.length; index++) {
        result = searchInTree(element.children[index], name, nodeToFind, action)
        if(result) element.children[index] = result
      }
      return element
    }
    return null
  }

  return (
    <div className="tree">
      {/* <p>root</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;ant</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;bear</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cat</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dog</p>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;elephant
      </p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;frog</p> */}
      <TreeNode {...data} addChildren={handleAdd} deleteChildren={handleDelete} />
    </div>
  );
}
