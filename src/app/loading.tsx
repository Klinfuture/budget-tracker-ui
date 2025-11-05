import { Loader2 } from "lucide-react";

export default function LoadingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-primary w-12 h-12" />
                <span className="text-lg text-muted-foreground">Loading...</span>
            </div>
        </div>
    );
}
