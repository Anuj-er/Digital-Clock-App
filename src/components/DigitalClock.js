import React, { useState, useEffect } from 'react';
import { Calendar, Cloud, Sun, Moon, Wind } from 'lucide-react';

const DayDisplay = ({ currentDay }) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {days.map((day, index) => (
        <div 
          key={day}
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${
            index === currentDay 
              ? 'bg-teal-500 text-white shadow-lg' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          } text-xs sm:text-sm font-medium backdrop-blur-sm`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3 hover:bg-white/20 transition-all duration-300">
    <Icon className="text-teal-300" size={24} />
    <div className="min-w-0 flex-1">
      <div className="text-white/60 text-xs sm:text-sm truncate">{title}</div>
      <div className="text-white font-medium text-sm sm:text-base truncate">{value}</div>
    </div>
  </div>
);

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

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

  const hours = time.getHours() % 12 || 12;
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-black/30 backdrop-blur-lg p-4 sm:p-8 rounded-2xl shadow-2xl max-w-3xl w-full">
        <div className="text-white/80 text-xl sm:text-2xl font-light mb-6 sm:mb-8 text-center">
          {greeting}
        </div>
        
        <DayDisplay currentDay={time.getDay()} />
        
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 space-y-2 sm:space-y-0">
          <div className="text-5xl sm:text-7xl text-white font-light tracking-wide">
            {hours}:{minutes}
          </div>
          <div className="text-3xl sm:text-5xl text-white/80 sm:ml-2">:{seconds}</div>
          <div className="sm:ml-4 text-xl sm:text-2xl bg-teal-500/20 px-3 py-1 rounded-lg text-white/90 backdrop-blur-sm">
            {ampm}
          </div>
        </div>

        <div className="text-center text-white/70 text-base sm:text-lg mb-6 sm:mb-8 px-2">
          {time.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard 
            icon={Calendar} 
            title="Week" 
            value={`Week ${Math.ceil(time.getDate() / 7)} of ${time.toLocaleString('default', { month: 'long' })}`} 
          />
          <InfoCard 
            icon={Sun} 
            title="Day Length" 
            value="12h 24m" 
          />
          <InfoCard 
            icon={Moon} 
            title="Moon Phase" 
            value="Waxing Crescent" 
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
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;