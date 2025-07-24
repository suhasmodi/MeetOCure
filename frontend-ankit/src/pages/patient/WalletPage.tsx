
import React, { useState, useCallback } from 'react';
import Header from './Header';
import Tabs, { TabLabel } from './Tabs';
import MissionCard from './MissionCard';
import RedemptionCard from './RedemptionCard';
import BalanceCard from './BalanceCard';
import { MISSIONS, REDEMPTION_OFFERS, USER_DATA } from './constants';
import { Mission, RedemptionOffer } from './types';

// --- Internal View Component (from WalletHomeView.tsx) ---
interface WalletHomeViewProps {
  onBack: () => void;
  onSeeAllRedeem: () => void;
  onSeeAllMissions: () => void;
  onRedemptionClick: (id: number) => void;
  onMissionClick: (id: number) => void;
}
const WalletHomeView: React.FC<WalletHomeViewProps> = ({ onBack, onSeeAllRedeem, onSeeAllMissions, onRedemptionClick, onMissionClick }) => (
    <div className="flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <Header title="Wallet" onBackClick={onBack} showIcons={true} />
        </div>
        <main className="flex-grow p-4 sm:p-6 bg-gray-50 space-y-8">
            <BalanceCard user={USER_DATA} />
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Redeem Points</h2>
                    <button onClick={onSeeAllRedeem} className="font-semibold text-teal-600 hover:text-teal-800 transition-colors">See All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
                    {REDEMPTION_OFFERS.slice(0, 4).map((offer) => <RedemptionCard key={offer.id} offer={offer} onClick={() => onRedemptionClick(offer.id)} />)}
                </div>
            </section>
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Complete Missions</h2>
                    <button onClick={onSeeAllMissions} className="font-semibold text-teal-600 hover:text-teal-800 transition-colors">See All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {MISSIONS.slice(0, 2).map((mission) => <MissionCard key={mission.id} mission={mission} onClick={() => onMissionClick(mission.id)} />)}
                </div>
            </section>
        </main>
    </div>
);

// --- Internal View Component (from PointsListView.tsx) ---
interface PointsListViewProps {
  initialTab: TabLabel;
  onBack: () => void;
  onRedemptionClick: (id: number) => void;
  onMissionClick: (id: number) => void;
}
const PointsListView: React.FC<PointsListViewProps> = ({ initialTab, onBack, onRedemptionClick, onMissionClick }) => {
    const [activeTab, setActiveTab] = useState<TabLabel>(initialTab);
    return (
        <div className="flex flex-col">
            <div className="bg-white sticky top-0 z-10">
                <Header title="Wallet" onBackClick={onBack} showIcons={true} />
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <main className="flex-grow p-4 sm:p-6 bg-gray-50">
                {activeTab === 'Redeem Points' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {REDEMPTION_OFFERS.map((offer) => <RedemptionCard key={offer.id} offer={offer} onClick={() => onRedemptionClick(offer.id)} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MISSIONS.map((mission) => <MissionCard key={mission.id} mission={mission} onClick={() => onMissionClick(mission.id)} />)}
                    </div>
                )}
            </main>
        </div>
    );
};

// --- Internal View Component (from DetailView.tsx) ---
interface DetailViewProps {
  type: 'mission' | 'redemption';
  itemId: number;
  onBack: () => void;
}
const DetailView: React.FC<DetailViewProps> = ({ type, itemId, onBack }) => {
    const isMission = type === 'mission';
    const item = isMission ? MISSIONS.find(m => m.id === itemId) : REDEMPTION_OFFERS.find(r => r.id === itemId);
    const terms = [
        "Users must be registered members to redeem points through the Reeward Wallet.",
        "Points can be redeemed for eligible rewards, vouchers, or discounts as per availability.",
        "A minimum number of points may be required for redemption, subject to program policies.",
        "Points may expire or be forfeited if not used within the specified period.",
        "Reeward Wallet reserves the right to modify or terminate the program at any time.",
        "For any issues or queries, contact our customer support team at [support email/phone number]."
    ];

    if (!item) {
        return (<div><Header title="Error" onBackClick={onBack} showIcons={false} /><p className="p-8 text-center">Item not found.</p></div>);
    }

    return (
        <div className="flex flex-col">
            <div className="bg-white sticky top-0 z-10">
                <Header title="Wallet" onBackClick={onBack} showIcons={false} />
            </div>
            <main className="flex-grow p-4 sm:p-6 lg:p-8 bg-gray-50">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
                        <div className="mb-6 lg:mb-0">
                            {isMission ? (<MissionCard mission={item as Mission} onClick={() => {}} />) : (<RedemptionCard offer={item as RedemptionOffer} onClick={() => {}} />)}
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
                            <div className="space-y-4 text-gray-600">{terms.map((term, index) => <p key={index}>{term}</p>)}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Main Page Component ---
type View = 'home' | 'list' | 'mission_detail' | 'redeem_detail';

interface AppState {
  view: View;
  initialListTab: TabLabel;
  selectedItemId: number | null;
}

const WalletPage: React.FC = () => {
    const [state, setState] = useState<AppState>({ view: 'home', initialListTab: 'Redeem Points', selectedItemId: null });

    const handleBack = useCallback(() => {
        switch (state.view) {
            case 'list': setState(s => ({ ...s, view: 'home' })); break;
            case 'mission_detail': setState(s => ({ ...s, view: 'list', initialListTab: 'Earn Points', selectedItemId: null })); break;
            case 'redeem_detail': setState(s => ({ ...s, view: 'list', initialListTab: 'Redeem Points', selectedItemId: null })); break;
            case 'home': default: alert('Back to main menu!'); break;
        }
    }, [state.view]);
    
    const handleSeeAll = (tab: TabLabel) => { setState(s => ({ ...s, view: 'list', initialListTab: tab })); };
    const handleMissionClick = (id: number) => { setState(s => ({ ...s, view: 'mission_detail', selectedItemId: id })); };
    const handleRedemptionClick = (id: number) => { setState(s => ({ ...s, view: 'redeem_detail', selectedItemId: id })); };

    const renderView = () => {
        switch (state.view) {
            case 'list': return <PointsListView initialTab={state.initialListTab} onBack={handleBack} onMissionClick={handleMissionClick} onRedemptionClick={handleRedemptionClick} />;
            case 'mission_detail': return <DetailView type="mission" itemId={state.selectedItemId!} onBack={handleBack} />;
            case 'redeem_detail': return <DetailView type="redemption" itemId={state.selectedItemId!} onBack={handleBack} />;
            case 'home': default: return <WalletHomeView onBack={handleBack} onSeeAllMissions={() => handleSeeAll('Earn Points')} onSeeAllRedeem={() => handleSeeAll('Redeem Points')} onMissionClick={handleMissionClick} onRedemptionClick={handleRedemptionClick} />;
        }
    };

    return (
        <div className="bg-white sm:shadow-lg sm:rounded-2xl overflow-hidden">
            {renderView()}
        </div>
    );
};

export default WalletPage;
