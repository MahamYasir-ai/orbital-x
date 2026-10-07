export type DimensionId = 'dim-01' | 'dim-02' | 'dim-03' | 'dim-04' | 'dim-05';

export interface DimensionInfo {
  id: DimensionId;
  name: string;
  tag: string;
  subtitle: string;
  color: string;
  accent: string;
  atmosphere: string;
  gravity: string;
  status: string;
  description: string;
}

export interface HotspotInfo {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  techSpec: string;
  description: string;
  position: [number, number, number]; // 3D coordinates
  efficiency: string;
  status: string;
}

export interface SatelliteInfo {
  id: string;
  name: string;
  orbit: string;
  status: 'ACTIVE' | 'RELAYING' | 'SYNCHRONIZING';
  mission: string;
  altitude: string;
  velocity: string;
  inclination: string;
  signalQuality: number;
}

export interface MissionArchiveItem {
  id: string;
  code: string;
  title: string;
  category: string;
  year: string;
  status: string;
  tagline: string;
  description: string;
  payload: string;
  distance: string;
  specs: { label: string; value: string }[];
  imageType: 'spacecraft' | 'lunar' | 'rover' | 'mars';
}

export interface TimelineEvent {
  year: string;
  title: string;
  classification: 'PUBLIC' | 'RESTRICTED' | 'CLASSIFIED';
  phase: string;
  summary: string;
  telemetry: string;
  highlight?: boolean;
}
