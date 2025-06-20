import { Separator } from "../ui/separator";

export function FullWidthDivider({ className = "h-[2px] bg-border/80 shadow-sm" }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className="absolute right-0" 
        style={{ 
          width: "90vw", 
          marginLeft: "-50vw"
        }}
      >
        <Separator className={className} />
      </div>
    </div>
  );
}
