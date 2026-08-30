import hero from '../assets/images/hero.jpg';
import lifestyle from '../assets/images/lifestyle.jpg';
import seated from '../assets/images/seated.jpg';
import goldPortrait from '../assets/images/gold-portrait.jpg';
import portraitSmile from '../assets/images/portrait-smile.jpg';
import portraitChair from '../assets/images/portrait-chair.jpg';
import portraitStanding from '../assets/images/portrait-standing.jpg';
import portraitClassic from '../assets/images/portrait-classic.jpg';
import clinicMoment from '../assets/images/clinic-moment.jpg';
import consultation from '../assets/images/consultation.jpg';
import detail1 from '../assets/images/detail-1.jpg';
import detail2 from '../assets/images/detail-2.jpg';

export const photos = {
  hero,
  lifestyle,
  seated,
  goldPortrait,
  portraitSmile,
  portraitChair,
  portraitStanding,
  portraitClassic,
  clinicMoment,
  consultation,
  detail1,
  detail2,
} as const;

export const homeGallery = [
  { src: seated, alt: 'Dra. Ligiana Maffini em retrato profissional sentada', caption: 'Acolhimento' },
  { src: goldPortrait, alt: 'Dra. Ligiana Maffini em retrato editorial dourado', caption: 'Presença' },
  { src: lifestyle, alt: 'Dra. Ligiana Maffini em retrato descontraído', caption: 'Escuta' },
  { src: portraitChair, alt: 'Dra. Ligiana Maffini em pose contemplativa', caption: 'Cuidado' },
  { src: portraitStanding, alt: 'Dra. Ligiana Maffini em retrato de corpo inteiro', caption: 'Continuidade' },
  { src: portraitClassic, alt: 'Dra. Ligiana Maffini em retrato clássico', caption: 'Confiança' },
] as const;

export const aboutGallery = [
  { src: portraitSmile, alt: 'Retrato sorridente da Dra. Ligiana Maffini' },
  { src: consultation, alt: 'Dra. Ligiana Maffini em ambiente de consulta' },
  { src: clinicMoment, alt: 'Momento de reflexão no consultório' },
] as const;
