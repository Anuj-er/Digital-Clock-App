import React, { useState, useEffect } from 'react';
import { Sun, Wind, Clock, Calendar as CalendarIcon, Thermometer, CloudRain } from 'lucide-react';

// Previous components remain the same
const DayDisplay = ({ currentDay }) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4 overflow-hidden">
      {days.map((day, index) => (
        <div 
          key={day}
          className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
            index === currentDay 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          } text-xs sm:text-sm font-medium backdrop-blur-sm`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, value, subValue, isLoading }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-start space-x-3 hover:bg-white/20 transition-all duration-300 overflow-hidden">
    <Icon className="text-blue-300 shrink-0" size={20} />
    <div className="min-w-0 flex-1 overflow-hidden">
      <div className="text-white/60 text-xs truncate">{title}</div>
      <div className="text-white font-medium text-sm truncate">
        {isLoading ? "Loading..." : value}
      </div>
      {subValue && (
        <div className="text-white/60 text-xs truncate mt-0.5">
          {isLoading ? "Loading..." : subValue}
        </div>
      )}
    </div>
  </div>
);

const WeekProgress = ({ time }) => {
  const startOfYear = new Date(time.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((time - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  const totalWeeks = 52;
  const progress = (weekNumber / totalWeeks) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 col-span-1 sm:col-span-2 hover:bg-white/20 transition-all duration-300 overflow-hidden">
      <div className="flex items-center justify-between mb-1.5 overflow-hidden">
        <div className="text-white font-medium text-sm truncate">Week {weekNumber} of {totalWeeks}</div>
        <div className="text-blue-300 text-xs truncate ml-2">{progress.toFixed(1)}% of year</div>
      </div>
      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-1.5 text-white/60 text-xs truncate">
        Week {Math.ceil(time.getDate() / 7)} of {Math.ceil(new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate() / 7)} this month
      </div>
    </div>
  );
};

const TimeDisplay = ({ hours, minutes, seconds, ampm }) => (
  <div className="relative flex flex-col items-center overflow-hidden">
    <div className="flex items-baseline justify-center">
      <span className="text-5xl sm:text-7xl text-white font-light tracking-wide">
        {hours}:{minutes}
      </span>
      <span className="text-xl sm:text-3xl text-white/80 ml-1">
        {seconds}
      </span>
    </div>
    <div className="mt-2 text-lg sm:text-xl bg-blue-500/20 px-3 py-0.5 rounded-lg text-white/90 backdrop-blur-sm">
      {ampm}
    </div>
  </div>
);

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [weather, setWeather] = useState({
    temp: 72,
    feels_like: 70,
    conditions: 'Clear',
    description: 'Clear skies'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hours = time.getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting('Good Morning');
    } else if (hours >= 12 && hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, [time]);

  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const getTimeLeftInDay = () => {
    const now = new Date(time);
    const endOfDay = new Date(time);
    endOfDay.setHours(23, 59, 59, 999);
    const diff = endOfDay - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  const getDayOfYear = () => {
    const start = new Date(time.getFullYear(), 0, 0);
    const diff = time - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const hours = time.getHours() % 12 || 12;
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-black/30 backdrop-blur-lg p-4 sm:p-6 rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden">
        <div className="text-white/80 text-lg sm:text-2xl font-light mb-4 sm:mb-6 text-center overflow-hidden">
          {greeting}
        </div>
        
        <DayDisplay currentDay={time.getDay()} />
        
        <div className="mb-4 sm:mb-6 overflow-hidden">
          <TimeDisplay 
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            ampm={ampm}
          />
        </div>

        <div className="text-center text-white/70 text-sm sm:text-base mb-4 sm:mb-6 px-2 overflow-hidden">
          {time.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 overflow-hidden">
          <WeekProgress time={time} />
          
          <InfoCard 
            icon={Clock} 
            title="Time Left Today" 
            value={getTimeLeftInDay()}
            subValue={`Day ${getDayOfYear()} of 365`}
          />
          
          <InfoCard 
            icon={CalendarIcon} 
            title="Month Progress" 
            value={`${Math.floor((time.getDate() / new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate()) * 100)}% Complete`}
            subValue={`${new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate() - time.getDate()} days remaining`}
          />

          <InfoCard 
            icon={Sun} 
            title="Day Length" 
            value="12h 24m" 
          />
          
          <InfoCard 
            icon={Wind} 
            title="Season" 
            value={(() => {
              const month = time.getMonth();
              if (month >= 2 && month <= 4) return 'Spring';
              if (month >= 5 && month <= 7) return 'Summer';
              if (month >= 8 && month <= 10) return 'Fall';
              return 'Winter';
            })()} 
          />

          <InfoCard 
            icon={Thermometer} 
            title="Temperature" 
            value={`${Math.round(weather.temp)}°F`}
            subValue={`Feels like ${Math.round(weather.feels_like)}°F`}
            isLoading={isLoading}
          />

          <InfoCard 
            icon={CloudRain} 
            title="Weather" 
            value={weather.conditions}
            subValue={weather.description}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;``