'use client';

import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

interface Category {
    id: string;
    name: string;
}

interface CategoryPillsProps {
    categories: Category[];
    activeId: string | null;
    onSelect: (id: string) => void;
    isAdmin?: boolean;
    onAdd?: () => void;
    onDelete?: (id: string) => void;
}

export default function CategoryPills({
    categories,
    activeId,
    onSelect,
    isAdmin = false,
    onAdd,
    onDelete
}: CategoryPillsProps) {
    const scrollLeft = () => {
        const container = document.getElementById('category-scroll');
        container?.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const container = document.getElementById('category-scroll');
        container?.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="mb-6 relative">
            {/* Left Arrow */}
            {categories.length > 5 && (
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
            )}

            {/* Category Pills */}
            <div
                id="category-scroll"
                className="flex overflow-x-auto pb-2 no-scrollbar space-x-3 items-center px-10"
            >
                {categories.map((cat) => (
                    <div key={cat.id} className="relative flex-shrink-0 group/cat">
                        <button
                            onClick={() => onSelect(cat.id)}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm ${activeId === cat.id
                                    ? 'bg-red-500 text-white shadow-red-200'
                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {cat.name}
                        </button>
                        {isAdmin && onDelete && (
                            <button
                                onClick={() => onDelete(cat.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover/cat:opacity-100 transition shadow-lg"
                                title="Delete Category"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                ))}
                {isAdmin && onAdd && (
                    <button
                        onClick={onAdd}
                        className="flex-shrink-0 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-indigo-200 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add
                    </button>
                )}
            </div>

            {/* Right Arrow */}
            {categories.length > 5 && (
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            )}
        </div>
    );
}
