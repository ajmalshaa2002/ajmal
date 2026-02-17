/**
 * Responsive Design Utilities
 * Provides utilities for device type detection and responsive behavior
 */

import React from 'react';

// Breakpoints
export const BREAKPOINTS = {
  xs: 0,      // Extra small (phones)
  sm: 480,    // Small phones
  md: 640,    // Tablets
  lg: 768,    // Tablets & small desktops
  xl: 1024,   // Desktops
  xxl: 1440   // Large desktops
};

// Helper to check if a breakpoint is active
export const isBreakpoint = (breakpoint) => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= breakpoint;
};

// Device type detection
export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  
  if (width < BREAKPOINTS.sm) return 'phone-xs';
  if (width < BREAKPOINTS.md) return 'phone-sm';
  if (width < BREAKPOINTS.lg) return 'tablet';
  if (width < BREAKPOINTS.xl) return 'desktop-sm';
  return 'desktop';
};

// Check if device is mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.lg;
};

// Check if device is tablet
export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl;
};

// Check if device is desktop
export const isDesktop = () => {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= BREAKPOINTS.xl;
};

// Check if device is touch-enabled
export const isTouchEnabled = () => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

// Get viewport dimensions
export const getViewportDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 1440, height: 900, aspectRatio: 1.6 };
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
  };
};

// Optimize 3D canvas size based on device
export const get3DCanvasSize = () => {
  const { width, height } = getViewportDimensions();
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'phone-xs':
      return { width: Math.max(280, width - 30), height: 250 };
    case 'phone-sm':
      return { width: Math.max(300, width - 30), height: 280 };
    case 'tablet':
      return { width: Math.max(350, width - 40), height: 350 };
    case 'desktop-sm':
      return { width: Math.max(500, width - 50), height: 400 };
    default:
      return { width: Math.max(600, width - 100), height: 500 };
  }
};

// Get particle count based on device performance
export const getParticleCount = () => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'phone-xs':
      return 800;  // Very low for old phones
    case 'phone-sm':
      return 1200; // Low for small phones
    case 'tablet':
      return 1500; // Medium for tablets
    case 'desktop-sm':
      return 2000; // High for small desktops
    default:
      return 3000; // Very high for large desktops
  }
};

// Optimize animation frame rate
export const shouldReduceAnimations = () => {
  if (typeof window === 'undefined') return false;
  
  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Reduce animations on mobile devices
  const onMobile = isMobile();
  
  return prefersReduced || (onMobile && !isDesktop());
};

// Hook for responsive behavior (use in React components)
export const useResponsive = () => {
  const [dimensions, setDimensions] = React.useState(getViewportDimensions());
  const [deviceType, setDeviceType] = React.useState(getDeviceType());
  
  React.useEffect(() => {
    const handleResize = () => {
      setDimensions(getViewportDimensions());
      setDeviceType(getDeviceType());
    };
    
    // Debounce resize events
    const debounceTimer = setTimeout(handleResize, 0);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(debounceTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return {
    dimensions,
    deviceType,
    isMobile: deviceType !== 'desktop' && deviceType !== 'desktop-sm',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop' || deviceType === 'desktop-sm',
    isTouchEnabled: isTouchEnabled(),
    shouldReduceAnimations: shouldReduceAnimations()
  };
};

export default {
  BREAKPOINTS,
  isBreakpoint,
  getDeviceType,
  isMobile,
  isTablet,
  isDesktop,
  isTouchEnabled,
  getViewportDimensions,
  get3DCanvasSize,
  getParticleCount,
  shouldReduceAnimations,
  useResponsive
};
