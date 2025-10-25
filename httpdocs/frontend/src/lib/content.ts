import mentorsData from '@content/mentors.json';
import menteesData from '@content/mentees.json';
import projectsData from '@content/projects.json';
import partnersData from '@content/partners.json';
import goalsData from '@content/goals.json';
import meetingsData from '@content/meetings.json';
import type { Goal, Meeting, Mentor, Mentee, Partner, Project } from '@/types/content';

export const content = {
  mentors: mentorsData as Mentor[],
  mentees: menteesData as Mentee[],
  projects: projectsData as Project[],
  partners: partnersData as Partner[],
  goals: goalsData as Goal[],
  meetings: meetingsData as Meeting[],
};

export function getProjectBySlug(slug: string) {
  return content.projects.find((project) => project.slug === slug);
}

export function getProjectHighlights(count = 3) {
  return content.projects.slice(0, count);
}
