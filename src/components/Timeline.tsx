import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface TimelineItem {
  stage: string;
  location: string;
  date: string;
  completed?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start space-x-4 animate-slide-in"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="flex-shrink-0">
            {item.completed !== false ? (
              <CheckCircle className="h-8 w-8 text-neon-lime" />
            ) : (
              <Circle className="h-8 w-8 text-neutral-grey" />
            )}
          </div>
          <div className="flex-1 bg-white rounded-lg p-4 shadow-md border border-neutral-grey/10 hover:shadow-lg transition-shadow duration-300">
            <h4 className="font-poppins font-semibold text-lg text-neutral-black mb-1">
              {item.stage}
            </h4>
            <p className="text-sm text-neutral-grey mb-2">{item.location}</p>
            <p className="text-xs text-primary-green font-medium">{item.date}</p>
          </div>
          {index < items.length - 1 && (
            <div className="absolute left-4 mt-8 w-px h-6 bg-neutral-grey/30" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;