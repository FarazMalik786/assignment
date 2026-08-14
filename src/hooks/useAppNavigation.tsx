import { useNavigate } from "react-router-dom";

export function useAppNavigation() {
    const navigate = useNavigate();

    return {
        navigate
    };
}