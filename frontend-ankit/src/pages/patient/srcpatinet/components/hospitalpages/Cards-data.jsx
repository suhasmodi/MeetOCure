
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Headerhos from './Header-hos';
import HospitalCard from './HospitalCard-hos';
// import { FilterType, Hospital, SortCriteria, SortOrder } from './types';
import { SearchIcon, SortIcon } from './Icons';
import HospitalDetailsPage from './HospitalDetailsPage-hos';

const allHospitalsData= [
    { 
        id: 1, 
        name: 'Sunrise Health Hospital', 
        type: 'Hospital', 
        distance: 2.5, 
        time: 40,
        location: 'Vijayawada', 
        rating: 5, 
        reviews: 1872, 
        imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '2,000+',
        experience: '10+',
        contact: '+91 9939069288',
        workingHours: 'Monday-Friday, 08.00 AM-18.00 PM'
    },
    { 
        id: 2, 
        name: 'Healing Touch Clinic', 
        type: 'Clinic', 
        distance: 1.2, 
        time: 10, 
        location: 'Guntur', 
        rating: 4.9, 
        reviews: 212, 
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '1,800+',
        experience: '12+',
        contact: '+91 9876543211',
        workingHours: 'Monday-Saturday, 9.00 AM - 7.00 PM'
    },
    { 
        id: 3, 
        name: 'Bright Smile Dental', 
        type: 'Dental', 
        distance: 3.1, 
        time: 25, 
        location: 'Tenali', 
        rating: 4.7, 
        reviews: 98, 
        imageUrl: 'https://images.unsplash.com/photo-1606318467434-d4a6a6f33230?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '900+',
        experience: '7+',
        contact: '+91 9876543212',
        workingHours: 'Monday-Friday, 10.00 AM - 6.00 PM'
    },
    { 
        id: 4, 
        name: 'Green Leaf Ayurvedic', 
        type: 'Ayurvedic', 
        distance: 5.5, 
        time: 45, 
        location: 'Vijayawada', 
        rating: 4.9, 
        reviews: 301, 
        imageUrl: 'https://images.unsplash.com/photo-1544132139-9945c742734a?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '2,200+',
        experience: '15+',
        contact: '+91 9876543213',
        workingHours: 'Monday-Saturday, 8.00 AM - 5.00 PM'
    },
    { 
        id: 5, 
        name: 'City Central Pharmacy', 
        type: 'Pharmacy', 
        distance: 0.8, 
        time: 5, 
        location: 'Guntur', 
        rating: 4.5, 
        reviews: 120, 
        imageUrl: 'https://images.unsplash.com/photo-1576683567222-ac74d4411182?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '3,000+',
        experience: '5+',
        contact: '+91 9876543214',
        workingHours: 'Open 24/7'
    },
    { 
        id: 6, 
        name: 'Manipal Hospital', 
        type: 'Hospital', 
        distance: 7.2, 
        time: 50, 
        location: 'Vijayawada', 
        rating: 4.6, 
        reviews: 450, 
        imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '3,500+',
        experience: '25+',
        contact: '+91 9876543215',
        workingHours: 'Open 24/7 for Emergencies'
    },
    { 
        id: 7, 
        name: 'Kamineni Hospitals', 
        type: 'Hospital', 
        distance: 4.0, 
        time: 30, 
        location: 'Guntur', 
        rating: 4.4, 
        reviews: 320, 
        imageUrl: 'https://images.unsplash.com/photo-1629904853716-f0bc64219b1b?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '2,800+',
        experience: '22+',
        contact: '+91 9876543216',
        workingHours: 'Open 24/7 for Emergencies'
    },
    { 
        id: 8, 
        name: 'Aayush Hospitals', 
        type: 'Hospital', 
        distance: 8.1, 
        time: 60, 
        location: 'Tenali', 
        rating: 4.2, 
        reviews: 280, 
        imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '2,500+',
        experience: '18+',
        contact: '+91 9876543217',
        workingHours: 'Open 24/7 for Emergencies'
    },
    { 
        id: 9, 
        name: 'Apollo Pharmacy', 
        type: 'Pharmacy', 
        distance: 1.5, 
        time: 12, 
        location: 'Vijayawada', 
        rating: 4.6, 
        reviews: 180, 
        imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d27929?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '4,000+',
        experience: '10+',
        contact: '+91 9876543218',
        workingHours: 'Open 24/7'
    },
    { 
        id: 10, 
        name: 'Family Care Clinic', 
        type: 'Clinic', 
        distance: 2.8, 
        time: 22, 
        location: 'Guntur', 
        rating: 4.8, 
        reviews: 190, 
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-6ab18a5d7814?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '1,600+',
        experience: '9+',
        contact: '+91 9876543219',
        workingHours: 'Monday-Saturday, 9.00 AM - 8.00 PM'
    },
    { 
        id: 11, 
        name: 'Patanjali Ayurvedic Center', 
        type: 'Ayurvedic', 
        distance: 6.3, 
        time: 55, 
        location: 'Tenali', 
        rating: 4.9, 
        reviews: 250, 
        imageUrl: 'https://images.unsplash.com/photo-1584362352829-b6131b782b13?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '2,000+',
        experience: '14+',
        contact: '+91 9876543220',
        workingHours: 'Monday-Saturday, 8.00 AM - 6.00 PM'
    },
    { 
        id: 12, 
        name: 'Dental World', 
        type: 'Dental', 
        distance: 3.9, 
        time: 35, 
        location: 'Vijayawada', 
        rating: 4.8, 
        reviews: 150, 
        imageUrl: 'https://images.unsplash.com/photo-1594495893623-2321ea3a35d7?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '1,200+',
        experience: '11+',
        contact: '+91 9876543221',
        workingHours: 'Monday-Friday, 10.00 AM - 7.00 PM'
    },
    { 
        id: 13, 
        name: 'Metro General', 
        type: 'Hospital', 
        distance: 9.5, 
        time: 70, 
        location: 'Guntur', 
        rating: 4.3, 
        reviews: 500, 
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '4,000+',
        experience: '30+',
        contact: '+91 9876543222',
        workingHours: 'Open 24/7 for Emergencies'
    },
    { 
        id: 14, 
        name: 'Wellness Meds', 
        type: 'Pharmacy', 
        distance: 2.1, 
        time: 15, 
        location: 'Tenali', 
        rating: 4.7, 
        reviews: 110, 
        imageUrl: 'https://images.unsplash.com/photo-1622325994800-482436e32d2d?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '2,500+',
        experience: '6+',
        contact: '+91 9876543223',
        workingHours: 'Monday-Sunday, 8.00 AM - 10.00 PM'
    },
    { 
        id: 15, 
        name: 'Community Clinic', 
        type: 'Clinic', 
        distance: 4.5, 
        time: 40, 
        location: 'Vijayawada', 
        rating: 4.5, 
        reviews: 130, 
        imageUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=600&auto=format&fit=crop', 
        isFavorite: false,
        patients: '1,400+',
        experience: '5+',
        contact: '+91 9876543224',
        workingHours: 'Monday-Friday, 9.00 AM - 5.00 PM'
    },
];

const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0c4d6b]"></div>
    </div>
);

const App = () => {
    const [loading, setLoading] = useState(true);
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortCriteria, setSortCriteria] = useState('Default');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);
    
    const sortDropdownRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setHospitals(allHospitalsData);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setIsSortDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const sortedAndFilteredHospitals = useMemo(() => {
        let processedHospitals = [...hospitals];

        if (activeFilter !== 'All') {
            processedHospitals = processedHospitals.filter(h => h.type === activeFilter);
        }
        if (searchTerm) {
            processedHospitals = processedHospitals.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (sortCriteria === 'Liked') {
            return processedHospitals.filter(h => h.isFavorite);
        }
        switch (sortCriteria) {
            case 'Distance':
                processedHospitals.sort((a, b) => sortOrder === 'asc' ? a.distance - b.distance : b.distance - a.distance);
                break;
            case 'Review':
                processedHospitals.sort((a, b) => sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating);
                break;
            case 'Default':
            default:
                processedHospitals.sort((a, b) => a.id - b.id);
                break;
        }

        return processedHospitals;
    }, [hospitals, searchTerm, activeFilter, sortCriteria, sortOrder]);

    const handleToggleFavorite = (id) => {
        setHospitals(prev => prev.map(h => h.id === id ? { ...h, isFavorite: !h.isFavorite } : h));
        if (selectedHospital && selectedHospital.id === id) {
            setSelectedHospital(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
        }
    };
    
    const handleSortCriteriaChange = (criteria) => {
        setSortCriteria(criteria);
        setIsSortDropdownOpen(false);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        setIsSortDropdownOpen(false);
    };

    const filterOptions = ['All', 'Hospital', 'Clinic', 'Dental', 'Pharmacy', 'Ayurvedic'];

    if (loading) {
        return <LoadingSpinner />;
    }
    
    if (selectedHospital) {
        return <HospitalDetailsPage hospital={selectedHospital} onBack={() => setSelectedHospital(null)} onToggleFavorite={handleToggleFavorite} />
    }

    return (
        // <div className="bg-gray-100 w-full min-h-screen font-sans">
            <div className="container mx-auto w-full sm:p-2">
                <Headerhos title="All Hospitals" />

                <div className="my-6 w-full space-y-4">
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Hospitals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-[#697080] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0c4d6b] text-gray-900"
                        />
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {filterOptions.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                                        activeFilter === filter
                                            ? 'bg-[#0c4d6b] text-white shadow-md'
                                            : 'bg-white text-[#0c4d6b] border border-[#0c4d6b]'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                        
                        <div className="flex items-center justify-between md:justify-end gap-4 flex-shrink-0 w-full md:w-auto">
                            <p className="font-semibold text-sm text-gray-500">{sortedAndFilteredHospitals.length} found</p>
                            <div className="relative" ref={sortDropdownRef}>
                                <button onClick={() => setIsSortDropdownOpen(prev => !prev)} className="flex items-center space-x-1 font-semibold text-gray-600">
                                    <span>{sortCriteria}</span>
                                    <SortIcon className="w-4 h-4" />
                                </button>
                                {isSortDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                        <div className="py-1">
                                            {(['Default', 'Distance', 'Review', 'Liked'] ).map(c => (
                                               <button key={c} onClick={() => handleSortCriteriaChange(c)} className={`w-full text-left px-4 py-2 text-sm ${sortCriteria === c ? 'bg-blue-100 text-[#0c4d6b]' : 'text-gray-700'} hover:bg-gray-100`}>{c}</button>
                                            ))}
                                        </div>
                                        <div className="border-t border-gray-200"></div>
                                        <div className="py-1">
                                           <button onClick={() => handleSortOrderChange('asc')} className={`w-full text-left px-4 py-2 text-sm ${sortOrder === 'asc' ? 'bg-blue-100 text-[#0c4d6b]' : 'text-gray-700'} hover:bg-gray-100`}>Ascending</button>
                                           <button onClick={() => handleSortOrderChange('desc')} className={`w-full text-left px-4 py-2 text-sm ${sortOrder === 'desc' ? 'bg-blue-100 text-[#0c4d6b]' : 'text-gray-700'} hover:bg-gray-100`}>Descending</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedAndFilteredHospitals.length > 0 ? (
                        sortedAndFilteredHospitals.map(hospital => (
                            <div key={hospital.id} className="cursor-pointer h-full" onClick={() => setSelectedHospital(hospital)}>
                                <HospitalCard hospital={hospital} onToggleFavorite={handleToggleFavorite} />
                            </div>
                        ))
                    ) : (
                         <div className="text-center py-16 text-gray-500 col-span-full">
                            <p className="font-semibold text-lg">No results found.</p>
                            <p className="text-sm">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            {/* </div> */}
        // </div>
    );
};

export default App;
