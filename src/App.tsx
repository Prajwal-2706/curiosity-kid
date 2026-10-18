/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CrayonNavbar } from './components/CrayonNavbar';
import { FrameByFrameStory } from './components/FrameByFrameStory';
import { CharacterSheetModal } from './components/CharacterSheetModal';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { InteractiveDoodleCanvas } from './components/InteractiveDoodleCanvas';
import { RCCarMiniGame } from './components/RCCarMiniGame';
import { ComputerVideoModal } from './components/ComputerVideoModal';
import { CrayonFooter } from './components/CrayonFooter';

export default function App() {
  const [isCharacterSheetOpen, setIsCharacterSheetOpen] = useState(false);
  const [isBuildVideoOpen, setIsBuildVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffdf7] bg-notebook-grid text-[#2f3542] selection:bg-[#ff7675] selection:text-white relative">
      {/* Top red margin line mimicking school notebook */}
      <div className="fixed top-0 bottom-0 left-6 sm:left-14 w-0.5 bg-red-400/25 pointer-events-none z-10" />

      {/* Navigation Header */}
      <CrayonNavbar
        onOpenCharacterSheet={() => setIsCharacterSheetOpen(true)}
        onOpenBuildVideo={() => setIsBuildVideoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-20">
        {/* Core Scrolling Story (Continuous Animation Canvas) */}
        <FrameByFrameStory
          onOpenCharacterSheet={() => setIsCharacterSheetOpen(true)}
          onOpenBuildVideo={() => setIsBuildVideoOpen(true)}
        />

        {/* What They Do: Projects & Inventions Showcase */}
        <ProjectsShowcase />

        {/* Interactive Immersion: Crayon Drawing Pad */}
        <InteractiveDoodleCanvas />

        {/* Interactive Immersion: RC Car Test Track Mini-Game */}
        <RCCarMiniGame />
      </main>

      {/* Footer & Hackathon Track 2 Checklist */}
      <CrayonFooter
        onOpenCharacterSheet={() => setIsCharacterSheetOpen(true)}
        onOpenBuildVideo={() => setIsBuildVideoOpen(true)}
      />

      {/* 5-Point Character Sheet Modal */}
      <CharacterSheetModal
        isOpen={isCharacterSheetOpen}
        onClose={() => setIsCharacterSheetOpen(false)}
        onOpenBuildVideo={() => {
          setIsCharacterSheetOpen(false);
          setIsBuildVideoOpen(true);
        }}
      />

      {/* DIY RC Car Build Video Modal (Triggered by clicking the computer monitor in story!) */}
      <ComputerVideoModal
        isOpen={isBuildVideoOpen}
        onClose={() => setIsBuildVideoOpen(false)}
      />
    </div>
  );
}
