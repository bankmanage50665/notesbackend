import { Outlet } from "react-router-dom";
import NotesNavigation from "./NotesNavigation";

export default function NotesLayout() {
    return (
        <>
            <NotesNavigation />
            <Outlet /></>
    )
}