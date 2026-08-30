import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, Flip);

export { gsap, ScrollTrigger, SplitText, MotionPathPlugin, Flip };
