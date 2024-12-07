import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

interface ButtonProps {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
    click?:any;
}

const SubmitButton = ({ isLoading, className, children, click }: ButtonProps) => {
    return (
        <Button
            variant='outline'
            onClick={click}
            disabled={isLoading}
            className={className ?? "rounded-xl w-full text-4xl font-bold "}
        >
            {isLoading ? (
                <div className="flex items-center gap-4">
                    <Cookie className="animate-pulse"/>
                    Loading...
                    <Cookie className="animate-pulse"/>
                </div>
            ) : (
                children
            )}
        </Button>
    );
};

export default SubmitButton;