import Layout from '@/components/Layout'
import useCategories from '@/hooks/swr/useCategories';
import useMutation from '@/hooks/swr/useMutation';
import Link from 'next/link';
import React, { useRef } from 'react'
import { useState } from 'react';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import { nanoid } from 'nanoid';

function Categories() {
    const [formData, setFormData] = useState({
        category: '',
        selectedOption: '',
        properties: []
    });
    const [edited, setEdited] = useState(false)
    const inputRef = useRef(null)
    const { trigger, isMutating } = useMutation("/api/categories", "POST")
    const { data, loading, error } = useCategories()
    const { category, selectedOption, properties } = formData;
    const { trigger: updateCategory, isMutating: isMut } = useMutation("/api/categories", "PUT");

    function handleInput(ev) {
        setFormData({ ...formData, [ev.target.name]: ev.target.value })
    }

    function update(category) {
        return () => {
            setFormData({
                category: category.name, selectedOption: category.parent?._id ?? "", properties: category.properties.map(({ property, value, _id }) => {
                    return {
                        property,
                        _id,
                        value: value.join(",")
                    }
                })
            });
            inputRef.current.focus()
            setEdited(category._id)
        }
    }

    async function addCategory(ev) {
        ev.preventDefault()
        const modifiedProperties = properties.map(({ property, value, _id }) => {
            value = value.split(",").map(value => value.trim()).filter((value) => value !== "");
            return { property, value }
        })
        const data = { name: category, parent: selectedOption, properties: modifiedProperties }
        try {
            if (edited) {
                await updateCategory({ ...data, _id: edited })
            } else {

                await trigger(data)
            }
            setFormData({
                category: '',
                selectedOption: '',
                properties: []
            })
            setEdited(false)
        } catch (err) {
            console.log(err)
        }
    }

    function addNewProperties(ev) {
        setFormData({ ...formData, properties: [...formData.properties, { _id: nanoid(), property: "", value: "" }] })
    }

    function handlePropertiesChange(index) {
        return (ev) => {
            const updatedProperties = [...formData.properties]
            updatedProperties[index] = { ...updatedProperties[index], [ev.target.name]: ev.target.value }

            setFormData({
                ...formData,
                properties: updatedProperties
            })
        }
    }

    function removeEditMode() {
        setEdited(false)
        setFormData({
            category: '',
            selectedOption: '',
            properties: []
        })
    }

    function deleteProperty(index) {
        return (ev) => {
            const updatedProperties = [...formData.properties];
            updatedProperties.splice(index, 1); // Remove the item at the specified index

            setFormData({
                ...formData,
                properties: updatedProperties
            })
        }
    }

    return (
        <Layout>
            <div className='mx-auto max-w-[800px] w-full'>
                <h2 className='text-base md:text-2xl font-bold my-2 md:my-2 md:my-3 mb-4 text-gray-700'>Categories</h2>
                <form onSubmit={addCategory}>
                    <div className="mb-2 md:mb-3">
                        <label htmlFor="category" className='' >Category name</label>
                        <div className='grid grid-cols-2 gap-2' >
                            <input ref={inputRef} value={category} onChange={handleInput} id="category" name="category" type='text' placeholder='Category name' />
                            <select className='' onChange={handleInput} value={selectedOption} name='selectedOption'>
                                <option value="">No parent Category</option>
                                {data && data?.categories?.map((category) => {
                                    const { name, _id } = category
                                    return <option key={_id} value={_id}>{name}</option>
                                })}
                            </select>
                        </div>
                        <div className='my-2 md:my-3'>
                            <button type='button' className='hover:scale-[1] bg-primary text-white rounded-md py-1 text-sm md:text-base w-fit px-8 mt-2 md:mt-6 uppercase md:py-2' onClick={addNewProperties}>Add new Properties</button>
                        </div>
                        {properties && properties.map(({ property, value, _id }, index) => {
                            return <div key={_id}>
                                <div className='flex flex-col md:flex-row gap-3 my-2 md:my-3'>
                                    <input type='text' value={property} name="property" placeholder='Property' onChange={handlePropertiesChange(index)} />
                                    <input type='text' value={value} name="value" placeholder='value (comma separted)' onChange={handlePropertiesChange(index)} />
                                    <button className='brand-button w-fit text-sm md:text-base hover:scale-[1] py-1 px-8 bg-none bg-red-500 uppercase' type="button" onClick={deleteProperty(index)}>Delete</button>
                                </div>
                            </div>
                        })}
                        <div className='flex gap-2'>
                        {edited && <button type="button" onClick={removeEditMode} disabled={isMutating} className='disabled:opacity-70 bg-primary text-white rounded-md py-1 w-fit uppercase md:py-2 px-8 mt-4 text-sm md:text-base md:mt-6'>Cancel</button>}
                        <button disabled={isMut} type='submit' className='disabled:opacity-70 bg-primary text-white rounded-md py-1 text-sm md:text-base w-fit uppercase md:py-2 px-8 mt-4 md:mt-6'>Save</button>
                        </div>
                    </div>
                </form>
                {!edited && <div className='bg-white shadow-sm p-2 mt-4 overflow-auto '>
                    <div className='grid grid-cols-3 items-center min-w-xl border-b border-gray-200'>
                        <h2 className='py-2 text-sm font-bold uppercase text-gray-500'>Category Name</h2>
                        <h2 className='py-2 text-sm font-bold uppercase text-gray-500'>Parent Category</h2>
                    </div>
                    {data?.categories?.map((category) => {
                        const { name, _id, parent } = category
                        return <div key={_id} className='grid grid-cols-3 min-w-xl items-center py-1 border-b border-gray-200 min-w-xl'>
                            <div className='text-sm'>{name}</div>
                            <div>
                                <span className='text-sm'>{parent?.name ?? "None"}</span>
                            </div>
                            <div className='py-0.5 text-sm flex gap-2'>
                                <button className='bg-primary  w-fit flex items-center gap-1 px-3 py-1 text-white rounded-sm' onClick={update(category)} ><CreateTwoToneIcon />Edit</button>
                                <Link className='bg-red-500 w-fit flex items-center gap-1 px-3 py-1 text-white rounded-sm' href={`/categories/delete/${_id}`}><DeleteIcon className='!text-sm'/><span>delete</span></Link>
                            </div>
                        </div>
                        
                    })}
                    

                </div>}
            </div>
        </Layout>
    )
}

export default Categories

