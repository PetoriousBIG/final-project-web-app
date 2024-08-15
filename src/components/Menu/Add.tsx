import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap' 
import * as client from "./client";
import { addMenuItem, updateMenuItem } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

const Add = ({show, handleClose, editing, refresh, chef_id, chef, restaurant_id}) => {
    const [menuItem, setMenuItem] = useState<any>(null);
    const dispatch = useDispatch();
    const { currentMenuItem } = useSelector((state: any) => state.menuItemReducer);

    useEffect(() => {
      const state = editing ? currentMenuItem :
            {name: "", price: 0.00, chef_id: chef_id, chef_name: chef, description: "",
            restaurant_id: restaurant_id, chefs_intro: ""}
      setMenuItem(state)
    }, [currentMenuItem])

    const handleSubmit = async () => {
      console.log(`Menu-item: ${JSON.stringify(menuItem)}`)
        try {
          if (editing) {
            console.log("code hit here")

            const status = await client.updateMenuItem(menuItem);
            console.log(status)
            dispatch(updateMenuItem(menuItem));
          } else {
            const status = await client.createMenuItem(menuItem);
            dispatch(addMenuItem(menuItem));
          }
          performAncillaryActionsForClose();
        } catch (err: any) {
            console.log(err);
        }
    }
    
    const performAncillaryActionsForClose = async () => {
        setMenuItem({...menuItem, description: "", chefs_intro: "", name: "", price: 0.00 })
        handleClose();
    }

    return (
      <Modal show={show}
             onHide={performAncillaryActionsForClose}
             onExited={refresh}
             centered className='add-modal'>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginBottom: '10px'}}>{editing ? "Edit your Dish" : "Add your Dish"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='add-restaurant'>

            <div className='form-group'>
              <label htmlFor='dish-chef-name'>Chef Name</label>
              <input disabled className='form-control' id='dish-chef-name' value={chef}/>
            </div>

            <div className='form-group mt-3'>
              <label htmlFor='dish-name'>Dish Name</label>
              <input className='form-control' id='dish-name' value={menuItem && menuItem.name}
                onChange={(e) => setMenuItem({...menuItem, name: e.target.value})}/>
            </div>

            <div className='form-group mt-3'>
              <label htmlFor='dish-desc'>Dish Description</label>
              <textarea id="dish-desc" className='form-control' value={menuItem && menuItem.description}
                onChange={(e) => setMenuItem({...menuItem, description: e.target.value})}/>
            </div>

            <div className='form-group mt-3'>
              <label htmlFor='dish-intro'>Dish Story</label>
              <textarea id="dish-intro" className='form-control' value={menuItem && menuItem.chefs_intro}
                onChange={(e) => setMenuItem({...menuItem, chefs_intro: e.target.value})}/>
            </div>

            <div className='form-group mt-3'>
              <label htmlFor='dish-price'>Dish Price</label>
              <input id="dish-price" className='form-control' type='number' value={menuItem && menuItem.price}
                onChange={(e) => setMenuItem({...menuItem, price: e.target.value})}/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary mt-3" onClick={handleSubmit}>
            {editing ? "Edit Dish" : "Add Dish"}
          </button>
        </Modal.Footer>
      </Modal>
    )
}

export default Add;