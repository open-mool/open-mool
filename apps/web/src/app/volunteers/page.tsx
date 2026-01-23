import type { Metadata } from 'next';
import {
    VolunteerHero,
    ArtifactShowcase,
    DataFlowVisualization,
    ArchitectureDiagram,
    AIPipelineSection,
    RoleCards,
    TechStackGrid,
    ContributionCards,
    RoadmapTimeline,
    VolunteerFAQ,
    VolunteerCTA,
} from '@/components/volunteers';

export const runtime = 'edge';

export const metadata: Metadata = {
    title: 'Volunteer Kickoff | Open Mool',
    description: 'Welcome to the Open Mool volunteer kickoff. Learn how you can help preserve Himalayan heritage through technology.',
    openGraph: {
        title: 'Join the Mission | Open Mool Volunteer Kickoff',
        description: 'Discover how you can help build the digital vault for Himalayan culture.',
        type: 'website',
    },
};

export default function VolunteersPage() {
    return (
        <main className="min-h-screen bg-canvas">
            {/* Hero - Mission Overview */}
            <VolunteerHero />

            {/* Artifact Showcase */}
            <ArtifactShowcase />

            {/* How It Works - Data Flow */}
            <DataFlowVisualization />

            {/* Architecture Diagram */}
            <ArchitectureDiagram />

            {/* AI Pipeline - Detailed */}
            <AIPipelineSection />

            {/* Community Roles */}
            <RoleCards />

            {/* Tech Stack */}
            <TechStackGrid />

            {/* Ways to Contribute */}
            <ContributionCards />

            {/* Roadmap Timeline */}
            <RoadmapTimeline />

            {/* FAQ */}
            <VolunteerFAQ />

            {/* Final CTA */}
            <VolunteerCTA />
        </main>
    );
}
