import React, { useMemo } from "react";
import { skills, categoryOrder, type Skill } from "@/data/skills-data";
import * as Si from "react-icons/si";

/* ───────── helpers ───────── */

type Span = "1x1" | "2x1" | "1x2" | "2x2";
type Packed = Skill & { col:number; row:number; colSpan:number; rowSpan:number; size:Span };

/* dimensions for each span */
const dim = (s: Span) => (s === "1x1" ? [1,1] : s === "2x1" ? [1,2] : [2,2]);

/* pick size from importance unless forced */
const sizeFor = (s: Skill): Span => s.preferredSize || (s.importance===3?"2x2":s.importance===2?"2x1":"1x1");

/* guarded dynamic-icon renderer */
const Icon = (k?: string) => {
  if (!k?.startsWith("si:")) return null;
  const Comp = Si[k.slice(3) as keyof typeof Si] as React.FC<{className?:string}>|undefined;
  return Comp ? <Comp className="w-6 h-6 md:w-8 md:h-8" /> : null;
};

/* greedy exact-packing */
function pack(cols:number, tiles:(Skill&{size:Span})[]):Packed[]{
  const taken = new Set<number>();           // r*cols + c
  const fits = (r:number,c:number,h:number,w:number)=>
    c+w<=cols && [...Array(h)].every((_,i)=>[...Array(w)].every((_,j)=>!taken.has((r+i)*cols+c+j)));
  const occupy = (r:number,c:number,h:number,w:number)=>
    [...Array(h)].forEach((_,i)=>[...Array(w)].forEach((_,j)=>taken.add((r+i)*cols+c+j)));

  tiles.sort((a,b)=>
    a.size===b.size?0:a.size==="2x2"?-1:b.size==="2x2"?1:a.size==="2x1"?-1:1);

  const out:Packed[]=[];
  tiles.forEach(t=>{
    const choices:Span[]=t.size!=="2x1"?[t.size]:["2x1","1x2"];
    for(let r=0;;r++){
      for(let c=0;c<cols;c++){
        for(const ch of choices){
          const [h,w]=dim(ch);
          if(fits(r,c,h,w)){
            occupy(r,c,h,w);
            out.push({...t,row:r,col:c,rowSpan:h,colSpan:w,size:ch});
            return;
          }
        }
      }
    }
  });
  return out;
}

/* returns packed tiles once */
const usePackedTiles = () =>
  useMemo(()=>{
    const ordered = categoryOrder.flatMap(cat=>skills.filter(s=>s.category===cat));
    const withSize = ordered.map(s=>({...s,size:sizeFor(s)}));
    return pack(6,withSize);                 // 6-col desktop baseline
  },[]);

/* ───────── component ───────── */

export default function SkillsSection(){
  const tiles = usePackedTiles();

  return(
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-3 md:px-6">
        <h2 className="text-xl md:text-3xl font-semibold mb-8">My Skills</h2>

        <div
          className="grid rounded-lg overflow-hidden border border-border/30 shadow-sm
                     auto-rows-[minmax(90px,_1fr)]"
          style={{gridTemplateColumns:"repeat(6,minmax(0,1fr))"}}
        >
          {tiles.map((t,i)=>(
            <div
              key={i}
              style={{
                gridColumn:`${t.col+1} / span ${t.colSpan}`,
                gridRow   :`${t.row+1} / span ${t.rowSpan}`,
              }}
              className={`${t.color.bg} border border-gray-300/40 dark:border-gray-500/40 
                          flex flex-col items-center justify-center`}
            >
              {Icon(t.icon) && <span className={`${t.color.text} mb-1`}>{Icon(t.icon)}</span>}
              <span className={`${t.color.text} text-[10px] sm:text-xs md:text-sm font-medium`}>
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
