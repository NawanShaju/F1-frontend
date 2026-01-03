// src/components/DriverCard.jsx
import React from 'react';

export default function DriverCard({ driver, onClick }) {
  const getTeamGradient = (teamColour) => {
    if (!teamColour) return 'linear-gradient(90deg, #1f2937, #020617)';
    return `linear-gradient(90deg, #${teamColour} 0%, #0b0b0b 85%)`;
  };

  return (
    <div
      onClick={() => onClick(driver)}
      className="group cursor-pointer"
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
        style={{
          	background: getTeamGradient(driver.team_colour),
          	height: '240px',
			minWidth: '320px'
        }}
      >

		{/* line texture */}
		<div
			className="absolute inset-0 opacity-20"
			style={{
				backgroundImage:
				'repeating-linear-gradient(135deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 1px, transparent 1px, transparent 10px)'
			}}
		/>

        <div className="relative z-10 h-full flex items-center px-1">
          {/* LEFT CONTENT */}
          <div className="flex-1 pl-2">
            <h3 className="text-white/80 text-sm font-medium leading-tight">
              {driver.first_name}
            </h3>

            <h2 className="text-white text-3xl font-extrabold uppercase leading-tight">
              {driver.last_name}
            </h2>

            <p className="mt-1 text-sm text-white/70">
              {driver.team_name}
            </p>

            {/* Driver number */}
            <div className="mt-4 text-6xl font-black text-white/90 leading-none">
              {driver.driver_number}
            </div>
          </div>

          {/* DRIVER IMAGE */}
          	<div className="h-full flex items-end justify-end mt-auto">
				<div className="w-25 h-50 flex items-center justify-center">
					{driver.headshot_url ? (
					<img
						src={driver.headshot_url}
						alt={driver.full_name}
						className="h-48 w-auto object-contain transition-transform duration-300"
						style={{
							filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))',
							height: '200px',
							minWidth: '300px'
						}}
						onError={(e) => {
							e.currentTarget.style.display = 'none';
						}}
					/>
					) : (
					<span className="text-9xl opacity-30">👤</span>
					)}
				</div>
			</div>
        </div>

        {/* hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>
    </div>
  );
}
