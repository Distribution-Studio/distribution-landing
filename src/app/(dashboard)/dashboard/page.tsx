import { getUser } from "@/lib/auth-utils";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

async function getUserPrompts(userId: string) {

export const metadata: Metadata = {
	title: "Dashboard - Promptu",
	description: "Manage your AI prompts, view analytics, and create new content on Promptu.",
};

export default async function DashboardPage() {
	const user = await getUser();
	
	if (!user) {
		notFound();
	}


	const userPrompts = await getUserPrompts(user.id);
	
	// Calculate stats

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-4xl mx-auto px-4 lg:px-6 py-4">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
					{/* Main Content */}
					<div className="lg:col-span-3 order-2 lg:order-1">
						<div className="space-y-4">
							{/* Header */}
							<div className="flex items-center justify-between">
								<div>
									<h1 className="text-xl font-bold text-gray-900 mb-1">
										Welcome back, {user.name.split(' ')[0]}!
									</h1>
								</div>
							</div>


						</div>
					</div>

					{/* Sidebar - Right Side */}
					<div className="lg:col-span-1 order-1 lg:order-2">
					</div>
				</div>
			</div>
		</div>
	);
}