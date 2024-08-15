import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import * as client from "./client";
import { addRestaurant, updateRestaurant } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

const Add = ({show, handleClose, refresh, users, editing, owner, owner_id}) => {
    const [restaurant, setRestaurant] = useState<any>(null)
    const dispatch = useDispatch();
    const {currentRestaurant} = useSelector((state: any) => state.restaurantReducer)   

    useEffect(() => {
      const state = editing ? currentRestaurant : 
      {owner: owner, owner_id: owner_id, description: "", introduction: "", name: "", rating: 0, chef_ids: []} 
      setRestaurant(state)
    }, [currentRestaurant])

    const handleSubmit = async () => {
        try {
            const status = editing ? await client.updateRestaurant(restaurant) : await client.createRestaurant(restaurant);
            editing ? dispatch(updateRestaurant(restaurant)) : dispatch(addRestaurant(restaurant));
            performAncillaryActionsForClose()
        } catch (err: any) {
            console.log(err)
        }
    }

    const performAncillaryActionsForClose = async () => {
        setRestaurant({...restaurant, 
                description: "", introduction: "", name: "",
                chefs: []})
        handleClose();
    }

    return (
      <Modal show={show} 
             onHide={performAncillaryActionsForClose} 
             onExited={refresh}
             centered className='add-modal'>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginBottom: '10px' }}>{editing ? "Edit your Restaurant" : "Add your Restaurant"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='add-restaurant'>
            
            <div className='form-group'>
                <label htmlFor='restaurant-owner-name'>Owner Name</label>
                <input disabled className='form-control' id='restaurant-owner-name' value={owner}/>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="restaurant-name">Restaurant name</label>
              <input className='form-control' id='restaurant-name' value={restaurant && restaurant.name} 
                     onChange={(e) => setRestaurant({...restaurant, name: e.target.value})}/>
            </div>

            <div className="form-group mt-3">
              <label htmlFor="restaurant-description">Description</label>
              <textarea id="restaurant-description" className='form-control' value={restaurant && restaurant.description}
                        onChange={(e) => setRestaurant({...restaurant, description: e.target.value})}/>
            </div>

            <div className='form-group mt-3'>
              <label htmlFor="restaurant-owner-intro">Owner Intro</label>
              <textarea id="restaurant-owner-intro" className='form-control' value={restaurant && restaurant.introduction}
                        onChange={(e) => setRestaurant({...restaurant, introduction: e.target.value})}/>
            </div>

            <div className='form-group mt-3'>
                <label htmlFor="restaurant-chefs">Chefs</label>
                <select id="restaurant-chefs" className='form-control' multiple value={restaurant && restaurant.chef_ids}
                onChange={(e) => { 
                        const target = e.target
                        let value = Array.from(target.selectedOptions, option => option.value)
                        setRestaurant({...restaurant, chef_ids: value})
                    }}> 
                  {users.map((user) => (
                    <option value={user._id}> {user.firstName} {user.lastName} </option> 
                  ))}
                </select>
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
              {editing ? "Edit Restaurant" : "Add Restaurant"}
            </button>
        </Modal.Footer>
      </Modal>
    );
};

export default Add;