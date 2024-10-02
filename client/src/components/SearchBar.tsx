import { useNavigate, Link } from "react-router-dom";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import { ListOfPages } from "@/lib/ListOfPages";
import { Search, Book } from "lucide-react";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPages, setFilteredPages] = useState(ListOfPages);
    const [showResults, setShowResults] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);

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
        <div ref={searchRef} className="relative mx-auto w-full max-w-sm">
            <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="pl-8 pr-10 bg-background/50 border border-neutral-700 rounded-full focus:bg-background transition-colors"
                />
                <Link
                    to="/findpages"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-700 transition-colors"
                    title="View all pages"
                >
                    <Book className="h-4 w-4 text-muted-foreground" />
                </Link>
            </div>
            {showResults && (
                <div className="absolute z-10 w-full mt-1 bg-slate-800/95 rounded-b-2xl shadow-lg">
                    {filteredPages.length > 0 ? (
                        <ul className="max-h-60 min-h-32 overflow-auto py-1" role="listbox">
                            {filteredPages.map((page, index) => (
                                <li
                                    key={page.path}
                                    className="relative px-4 py-2 rounded-2xl hover:bg-slate-400/80 cursor-pointer text-sm"
                                    onClick={() => {
                                        navigate(page.path);
                                        setShowResults(false);
                                        setSearchQuery('');
                                    }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    role="option"
                                    aria-selected={hoveredIndex === index}
                                >
                                    {page.name}
                                    {hoveredIndex === index && page.shortDescription && (
                                        <div
                                            className="absolute left-0 z-20 p-2 mt-1 text-sm bg-slate-700 text-white rounded-xl shadow-lg max-w-xs ml-2"
                                            style={{ top: '50%', transform: 'translateY(50%)' }}
                                            role="tooltip"
                                        >
                                            {page.shortDescription}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-2 text-sm text-muted-foreground">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
}