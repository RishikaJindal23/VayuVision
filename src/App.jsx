import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import ForecastView from './components/ForecastView';
import RiskMapView from './components/RiskMapView';
import AlertsView from './components/AlertsView';
import ActionToolsView from './components/ActionToolsView';
import AboutPitchView from './components/AboutPitchView';
import { 
  checkBackendHealth, 
  fetchLocations, 
  fetchAirQuality, 
  fetchForecast, 
  fetchRiskMap, 
  fetchAlerts 
} from './services/api';
import { Wind, Heart, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLocId, setSelectedLocId] = useState('anand_vihar');
  const [locations, setLocations] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [forecastPeriod, setForecastPeriod] = useState(72);
  const [riskMapData, setRiskMapData] = useState(null);
  const [alertsData, setAlertsData] = useState(null);
  const [threshold, setThreshold] = useState(350);

  const [backendConnected, setBackendConnected] = useState(false);
  const [loadingAQ, setLoadingAQ] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const [loadingMap, setLoadingMap] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);

  // 1. Initial health check and load locations
  useEffect(() => {
    async function init() {
      const health = await checkBackendHealth();
      setBackendConnected(health.connected);

      const locs = await fetchLocations();
      setLocations(locs);
      if (locs.length > 0 && !selectedLocId) {
        setSelectedLocId(locs[0].id);
      }
    }
    init();
  }, []);

  // 2. Fetch Air Quality whenever selected location changes
  useEffect(() => {
    if (!selectedLocId) return;
    async function loadAQ() {
      setLoadingAQ(true);
      const data = await fetchAirQuality(selectedLocId);
      setAirQuality(data);
      setLoadingAQ(false);
    }
    loadAQ();
  }, [selectedLocId]);

  // 3. Fetch Forecast whenever location or forecastPeriod changes
  useEffect(() => {
    if (!selectedLocId) return;
    async function loadF() {
      setLoadingForecast(true);
      const data = await fetchForecast(selectedLocId, forecastPeriod);
      setForecastData(data);
      setLoadingForecast(false);
    }
    loadF();
  }, [selectedLocId, forecastPeriod]);

  // 4. Fetch Risk Map data once
  useEffect(() => {
    async function loadMap() {
      setLoadingMap(true);
      const data = await fetchRiskMap();
      setRiskMapData(data);
      setLoadingMap(false);
    }
    loadMap();
  }, []);

  // 5. Fetch Alerts whenever threshold changes
  useEffect(() => {
    async function loadA() {
      setLoadingAlerts(true);
      const data = await fetchAlerts(threshold);
      setAlertsData(data);
      setLoadingAlerts(false);
    }
    loadA();
  }, [threshold]);

  // Quick navigation helpers
  const handleSelectZoneFromMap = (locId) => {
    setSelectedLocId(locId);
    setActiveTab('forecast');
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        locations={locations}
        selectedLocId={selectedLocId}
        setSelectedLocId={setSelectedLocId}
        backendConnected={backendConnected}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            airQuality={airQuality}
            loading={loadingAQ}
            onNavigateToForecast={() => setActiveTab('forecast')}
            onNavigateToAlerts={() => setActiveTab('alerts')}
          />
        )}

        {activeTab === 'forecast' && (
          <ForecastView
            forecastData={forecastData}
            loading={loadingForecast}
            forecastPeriod={forecastPeriod}
            setForecastPeriod={setForecastPeriod}
            locations={locations}
            selectedLocId={selectedLocId}
            setSelectedLocId={setSelectedLocId}
          />
        )}

        {activeTab === 'risk-map' && (
          <RiskMapView
            riskMapData={riskMapData}
            loading={loadingMap}
            onSelectZone={handleSelectZoneFromMap}
          />
        )}

        {activeTab === 'alerts' && (
          <AlertsView
            alertsData={alertsData}
            loading={loadingAlerts}
            threshold={threshold}
            setThreshold={setThreshold}
            locations={locations}
            selectedLocId={selectedLocId}
          />
        )}

        {activeTab === 'action-tools' && (
          <ActionToolsView
            locations={locations}
            selectedLocId={selectedLocId}
          />
        )}

        {activeTab === 'about' && (
          <AboutPitchView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#04060d] px-4 lg:px-8 py-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Wind className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-200">VayuVision AI</span>
            <span className="text-slate-600">|</span>
            <span>Predict. Prepare. Protect.</span>
          </div>

          <div className="text-center sm:text-right text-slate-400 text-[11px]">
            <p>
              Developed for <b>Round 2 Checkpoint (5:00 AM Deliverable)</b> by <span className="text-cyan-300 font-semibold">Team CodeStorms</span>
            </p>
            <p className="text-slate-500 mt-0.5">
              Rishika Jindal • Navpreet Kaur • Yashika Bansal • Krishu Duggal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
