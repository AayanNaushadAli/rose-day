
import React from 'react';

export interface LoveMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export interface Message {
  text: string;
  author: string;
}

export interface FloatingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}