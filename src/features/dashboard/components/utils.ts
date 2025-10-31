// Confidence Levels
export enum Confidence {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
}

// Task / Goal Priorities
export enum Priority {
    ESSENTIAL = "essential",
    IMPORTANT = "important",
    FLEXIBLE = "flexible",
    GOAL = "goal",
}



export const getConfidenceColor = (confidence: Confidence) => {
    switch (confidence) {
        case Confidence.HIGH:
            return "bg-emerald-500/20 text-emerald-400";
        case Confidence.MEDIUM:
            return "bg-yellow-500/20 text-yellow-400";
        case Confidence.LOW:
            return "bg-orange-500/20 text-orange-400";
        default:
            return "bg-gray-500/20 text-gray-400";
    }
};

export const getPriorityColor = (priority: Priority) => {
    switch (priority) {
        case Priority.ESSENTIAL:
            return "border-l-red-500 bg-red-500/5";
        case Priority.IMPORTANT:
            return "border-l-yellow-500 bg-yellow-500/5";
        case Priority.FLEXIBLE:
            return "border-l-blue-500 bg-blue-500/5";
        case Priority.GOAL:
            return "border-l-emerald-500 bg-emerald-500/5";
        default:
            return "border-l-gray-500 bg-gray-500/5";
    }
};
