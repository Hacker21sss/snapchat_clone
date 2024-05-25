import React from 'react';
import { Input } from './ui/input';
import { SearchIcon } from 'lucide-react';

const Searchbar = () => {
    return (
        <div>
            <div className='flex items-center gap-2 bg-[#E3E6E8] rounded-xl px-2 py-3'>
                <SearchIcon />
                <input
                    type='text'
                    placeholder='search...'
                    className='w-full bg-transparent outline-none focus:outline-none'
                    // Add focus:outline-none to remove the outline when input is focused
                />
            </div>
        </div>
    );
};

export default Searchbar;
