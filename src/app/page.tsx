import Navbar from "@/components/layout/Navbar";
import StatusBar from "@/components/layout/StatusBar";
import Workspace from "@/components/layout/Workspace";

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <Workspace />
      </div>

      <StatusBar />
    </main>
  );
}
