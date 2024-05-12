import React, { useState } from 'react';

const MyComponent = () => {
    const [data, setData] = useState('');
    const [username, setUsername] = useState('');
    const [count, setCount] = useState({ addCount: 0, updateCount: 0 });

    const handleAdd = () => {
        fetch('https://coral-app-q2ip5.ondigitalocean.app/api/v1/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, newData: { data } })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data added successfully');
                    setData('');
                } else {
                    console.error('Failed to add data');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleUpdate = () => {
        fetch('https://coral-app-q2ip5.ondigitalocean.app/api/v1/users/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, updatedData: { data } })
        })
            .then(response => {
                if (response.ok) {
                    console.log('Data updated successfully');
                } else {
                    console.error('Failed to update data');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleCount = () => {
        fetch(`https://coral-app-q2ip5.ondigitalocean.app/api/v1/users/getcount/${username}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch count data');
                }
            })
            .then(data => {
                // console.log('Add Count:', data.addCount);
                // console.log('Update Count:', data.updateCount);

                setCount({ addCount: data.addCount, updateCount: data.updateCount });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>My Component</h1>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Data:
                    <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleAdd}>Add</button>
                <button type="button" onClick={handleUpdate}>Update</button>
                <br />
                <button type="button" onClick={handleCount}>Count</button>

                <span>Count:</span>
                <span>
                    AddCount: {count.addCount}
                    <br />
                    UpdateCount: {count.updateCount}
                </span>
            </form>
        </div>
    );
};

export default MyComponent;
