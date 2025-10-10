import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ModuleCardSkeleton = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <Skeleton className="w-16 h-16 rounded-2xl mb-4" />
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-5/6" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="w-16 h-16 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
};