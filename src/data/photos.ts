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
import clinicVideo1 from '../assets/images/clinic-video-1.webp';
import clinicVideo2 from '../assets/images/clinic-video-2.webp';
import clinicVideo3 from '../assets/images/clinic-video-3.webp';

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
  clinicVideo1,
  clinicVideo2,
  clinicVideo3,
} as const;

/** Home strip: Dra / consultório / Dra / consultório / Dra / consultório */
export const homeGallery = [
  {
    src: seated,
    alt: 'Dra. Ligiana Maffini em retrato profissional sentada',
    caption: 'Presença',
  },
  {
    src: clinicVideo1,
    alt: 'Sala de espera da clínica da Dra. Ligiana Maffini, com poltronas e TV',
    caption: 'Ambiente',
  },
  {
    src: goldPortrait,
    alt: 'Dra. Ligiana Maffini em retrato editorial dourado',
    caption: 'Cuidado',
  },
  {
    src: clinicVideo2,
    alt: 'Consultório da Dra. Ligiana Maffini no Cristo Rei, Curitiba',
    caption: 'Consultório',
  },
  {
    src: lifestyle,
    alt: 'Dra. Ligiana Maffini em retrato descontraído',
    caption: 'Escuta',
  },
  {
    src: clinicVideo3,
    alt: 'Detalhes do consultório da Dra. Ligiana Maffini em Curitiba',
    caption: 'Acolhimento',
  },
] as const;

export const aboutGallery = [
  { src: portraitSmile, alt: 'Retrato sorridente da Dra. Ligiana Maffini' },
  { src: consultation, alt: 'Dra. Ligiana Maffini em ambiente de consulta' },
  { src: clinicMoment, alt: 'Momento de reflexão no consultório' },
] as const;
