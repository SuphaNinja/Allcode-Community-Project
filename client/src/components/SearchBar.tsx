import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { ListOfPages } from "@/lib/ListOfPages";
import { FaSearch } from 'react-icons/fa';
import "../index.css"

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPages, setFilteredPages] = useState(ListOfPages);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setShowResults(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            const results = ListOfPages.filter(page =>
                page.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPages(results);
            setShowResults(true);
        } else {
            setFilteredPages(ListOfPages);
            setShowResults(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={searchRef} className="relative sm:mt-0 mt-8">
            <form onSubmit={handleSearch} className="flex flex-col items-center">
                <div className="flex items-center">
                    <Input
                        placeholder="Search pages..."
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="px-4 py-2 sm:border-none rounded-md shadow-sm focus:border focus:ring-2 focus:ring-fuchsia-400 transition duration-300 ease-in"
                    />
                    <Button type="submit" className="sm:block hidden">
                        <FaSearch className="text-xl text-neutral-400"/>
                    </Button>
                </div>
                {showResults && (
                    <div className="absolute top-full mt-2 w-full border border-neutral-500 p-2 bg-slate-900/10 shadow-lg">
                        {filteredPages.length > 0 ? (
                            <ul className="max-h-36 overflow-y-auto scrollable-div">
                                {filteredPages.map((page) => (
                                    <li key={page.path} className="p-2 hover:underline text-sm sm:text-base border-b border-neutral-700 hover:bg-slate-900/50">
                                        <Link
                                            to={page.path}
                                            className="block text-blue-500"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(page.path);
                                                setShowResults(false);
                                            }}
                                        >
                                            {page.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="p-2 text-gray-500">No results found</p>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}
