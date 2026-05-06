import React, { useEffect, useRef, useState } from 'react';
import Jaune from '../../../assets/jaune.jpg';
import { Fab } from '@mui/material';

function MapComponent() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    
    if (containerRef.current) {
      containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }

    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  const handleMouseDown = (event: any) => {
    setIsDragging(true);
    setInitialPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event: any) => {
    if (isDragging) {
      // console.log(event.clientX, event.clientY, initialPosition);
      setPosition({
        x: Math.min(0, event.clientX - initialPosition.x),
        y: Math.min(0, event.clientY - initialPosition.y),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event: any) => {
    event.preventDefault();
    const delta = event.deltaY;
    if (delta > 0) {
      setZoom(zoom - 0.01);
    } else {
      setZoom(zoom + 0.01);
    }
    // console.log('ouiieui', delta, zoom);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '400px',
        height: '400px',
        border: '1px solid black',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        className='test'
        style={{
          transform: `scale(${zoom})`
        }}
      >
        <img
          src={Jaune}
          alt="Image à déplacer"
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
          draggable="false"
        />
        <Fab
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: 'select'
          }}
        ></Fab>
      </div>
    </div>
  );
}

export default MapComponent;