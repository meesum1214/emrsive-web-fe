import React, { useEffect, useState } from 'react';
import { Checkbox } from '@mantine/core';
import Btn from './Btn';

export default ({ planName, data, onUpdate }) => {

    const [checkedItems, setCheckedItems] = useState([]);

    // Initialize checkedItems with the checked state based on existing "/Done" in item's content
    useEffect(() => {
        const initialChecked = data.map((item) => item.content.includes('/Done'));
        setCheckedItems(initialChecked);
    }, [data]);

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    const handleUpdateClick = () => {
        const updatedData = data.map((item, index) => ({
            ...item,
            content: `${item.content}${checkedItems[index] ? ' /Done' : ''}`,
        }));
        onUpdate(updatedData);
    };

    return (
        <div className='w-[280px] bg-blue-200 rounded-md p-4 border'>
            <div className='text-xl font-semibold'>Update Status of {planName} Plan</div>
            {data.map((item, index) => (
                <Checkbox
                    key={index}
                    checked={checkedItems[index]}
                    disabled={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                    label={item.content}
                    className='my-3'
                />
            ))}
            <div className='flex justify-center'>
                <Btn style="bg-blue-500" onClick={handleUpdateClick}>Update</Btn>
            </div>
        </div>
    );
};