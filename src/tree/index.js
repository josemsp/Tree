import "./index.css";
import dataJSON from "./data.json"
import TreeNode from "./TreeNode";
import { useEffect, useState } from "react";

export default function Tree () {
  // const [data, setData] = useState(dataJSON)
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch('https://api.jsonbin.io/b/61e4c327ba87c130e3e980ec', {
      method: 'GET',
      headers: { 'secret-key': "$2b$10$obaQjMVzT/bmdka6gY6JvOg1JDCBbaE56uWiKFydM9zs.IKoLylLe" }
    })
      .then(async res => {
        console.log(`res`, res)
        if (res.ok) {
          setData(await res.json())
        }
        else setData([])
      })
      .catch(e => setData([]))
  }


  const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }

  const handleAdd = ({ father, nodeToFind }) => {
    let _data = copyObject(data)
    const result = searchInTree(_data, father, nodeToFind, addChildren)
    if (JSON.stringify(result) !== JSON.stringify(data)) {
      setData(result)
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
    if (JSON.stringify(result) !== JSON.stringify(data)) {
      setData(result)
    }
  }

  const deleteChildren = (element, nodeToFind) => {
    let _element = copyObject(element)
    _element.children = _element.children.filter(n => n.node !== nodeToFind)
    return _element
  }

  const addInput = ({ father, nodeToFind }) => {
    let _data = copyObject(data)
    const result = searchInTree(_data, father, nodeToFind, setChildren)
    if (JSON.stringify(result) !== JSON.stringify(data)) {
      setData(result)
    }
  }

  const setChildren = (element, nodeToFind) => {
    let _element = copyObject(element)
    let node = _element.children.find(n => n.node === nodeToFind)
    node.children = []
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
        if (result) element.children[index] = result
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
      {console.log(`data`, data)}
      <TreeNode
        {...data}
        addChildren={handleAdd}
        deleteChildren={handleDelete}
        addInput={addInput}
      />
    </div>
  );
}
