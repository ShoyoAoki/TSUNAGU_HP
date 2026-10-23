"use client";
import {useEffect,useRef,useState} from "react";
import styles from "./OwlMatchBlink.module.css";
import {zh} from "@/lib/i18n/zh";
export default function OwlMatchBlink({locale="ja"}:{locale?:"ja"|"zh"}){
 const video=useRef<HTMLVideoElement>(null);const [motion,setMotion]=useState(false);const [failed,setFailed]=useState(false);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setMotion(!media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useEffect(()=>{if(motion){void video.current?.play().catch(()=>setFailed(true));}else video.current?.pause();},[motion]);
 return <div className={styles.mark}>{motion&&!failed?<video ref={video} autoPlay muted playsInline loop preload="metadata" poster="/videos/owlmatch-blink-poster.png" onError={()=>setFailed(true)} aria-label={locale==="zh"?zh.blink:"瞬きをするOwlMatchの目のロゴ"}><source src="/videos/owlmatch-blink.mp4" type="video/mp4"/></video>:<img src="/videos/owlmatch-blink-poster.png" alt="OwlMatch" width="512" height="272"/>}</div>;
}
