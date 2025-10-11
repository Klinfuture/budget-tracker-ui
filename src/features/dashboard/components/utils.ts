export const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
        case "high":
            return "bg-emerald-500/20 text-emerald-400";
        case "medium":
            return "bg-yellow-500/20 text-yellow-400";
        case "low":
            return "bg-orange-500/20 text-orange-400";
        default:
            return "bg-gray-500/20 text-gray-400";
    }
};

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "essential":
            return "border-l-red-500 bg-red-500/5";
        case "important":
            return "border-l-yellow-500 bg-yellow-500/5";
        case "flexible":
            return "border-l-blue-500 bg-blue-500/5";
        case "goal":
            return "border-l-emerald-500 bg-emerald-500/5";
        default:
            return "border-l-gray-500 bg-gray-500/5";
    }
};
