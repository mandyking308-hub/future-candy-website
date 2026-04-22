import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, LogOut, Mail, Clock, CheckCircle, MessageSquare, BookOpen, ClipboardCheck, Layers, Handshake, Archive } from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  source_page: string | null;
  status: string;
  created_at: string;
}

interface PartnerEnquiry {
  id: string;
  full_name: string;
  email: string;
  company: string | null;
  phone: string | null;
  website: string | null;
  enquiry_type: string;
  message: string;
  source_page: string | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Partner enquiries
  const [partnerEnquiries, setPartnerEnquiries] = useState<PartnerEnquiry[]>([]);
  const [partnerSearch, setPartnerSearch] = useState("");
  const [partnerStatusFilter, setPartnerStatusFilter] = useState("all");
  const [selectedPartner, setSelectedPartner] = useState<PartnerEnquiry | null>(null);

  const [activeTab, setActiveTab] = useState("general");

  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchEnquiries();
  }, [session, statusFilter]);

  useEffect(() => {
    if (session) fetchPartnerEnquiries();
  }, [session, partnerStatusFilter]);

  const fetchEnquiries = async () => {
    let query = supabase
      .from("futurecandy_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;
    if (error) {
      toast({ title: "Error", description: "Failed to load enquiries", variant: "destructive" });
    } else {
      setEnquiries((data as Enquiry[]) || []);
    }
  };

  const fetchPartnerEnquiries = async () => {
    let query = supabase
      .from("neoncandy_partner_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (partnerStatusFilter !== "all") {
      query = query.eq("status", partnerStatusFilter);
    }

    const { data, error } = await query;
    if (error) {
      toast({ title: "Error", description: "Failed to load partner enquiries", variant: "destructive" });
    } else {
      setPartnerEnquiries((data as PartnerEnquiry[]) || []);
    }
  };

  const updatePartnerStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("neoncandy_partner_enquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `Enquiry marked as ${status}` });
      fetchPartnerEnquiries();
      if (selectedPartner?.id === id) {
        setSelectedPartner({ ...selectedPartner, status });
      }
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("futurecandy_enquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `Enquiry marked as ${status}` });
      fetchEnquiries();
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(s) ||
      e.email.toLowerCase().includes(s) ||
      e.message.toLowerCase().includes(s)
    );
  });

  const statusBadge = (status: string) => {
    const variants: Record<string, string> = {
      new: "bg-candy-pink/20 text-candy-pink border-candy-pink/30",
      read: "bg-candy-cyan/20 text-candy-cyan border-candy-cyan/30",
      replied: "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return <Badge className={`${variants[status] || ""} border`}>{status}</Badge>;
  };

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    read: enquiries.filter((e) => e.status === "read").length,
    replied: enquiries.filter((e) => e.status === "replied").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <>
        <Helmet>
          <title>Admin Login | NeonCandy</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 glass border-candy-pink/30">
            <h1 className="text-2xl font-bold text-center mb-6">
              <span className="text-gradient">Admin Login</span>
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Admin email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-background/50 border-candy-pink/30"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-background/50 border-candy-pink/30"
                required
              />
              <Button type="submit" disabled={loginLoading} className="w-full glow-pink">
                {loginLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | NeonCandy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-gradient">NeonCandy Admin</span>
          </h1>
          <div className="flex items-center gap-2">
            <a href="/admin/content">
              <Button variant="outline" size="sm" className="border-border">
                <Layers className="w-4 h-4 mr-2" /> Content Engine
              </Button>
            </a>
            <a href="/admin/manual">
              <Button variant="outline" size="sm" className="border-border">
                <BookOpen className="w-4 h-4 mr-2" /> Manual
              </Button>
            </a>
            <a href="/admin/qa-report">
              <Button variant="outline" size="sm" className="border-border">
                <ClipboardCheck className="w-4 h-4 mr-2" /> QA Report
              </Button>
            </a>
            <Button variant="outline" onClick={handleLogout} className="border-candy-pink/30">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 glass border-border">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 glass border-candy-pink/30">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-candy-pink" />
              <div>
                <p className="text-2xl font-bold text-candy-pink">{stats.new}</p>
                <p className="text-xs text-muted-foreground">New</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 glass border-candy-cyan/30">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-candy-cyan" />
              <div>
                <p className="text-2xl font-bold text-candy-cyan">{stats.read}</p>
                <p className="text-xs text-muted-foreground">Read</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 glass border-green-500/30">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-green-400">{stats.replied}</p>
                <p className="text-xs text-muted-foreground">Replied</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background/50 border-border"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 bg-background/50 border-border">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2">
            <Card className="glass border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Email</TableHead>
                      <TableHead className="text-muted-foreground">Subject</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnquiries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No enquiries found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEnquiries.map((enquiry) => (
                        <TableRow
                          key={enquiry.id}
                          className={`border-border cursor-pointer hover:bg-muted/20 transition-colors ${selectedEnquiry?.id === enquiry.id ? "bg-muted/30" : ""}`}
                          onClick={() => setSelectedEnquiry(enquiry)}
                        >
                          <TableCell className="font-medium text-foreground">{enquiry.name}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{enquiry.email}</TableCell>
                          <TableCell className="text-muted-foreground text-sm capitalize">{enquiry.subject}</TableCell>
                          <TableCell>{statusBadge(enquiry.status)}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(enquiry.created_at).toLocaleDateString("en-GB", {
                              day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                            })}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* Detail Panel */}
          <div>
            {selectedEnquiry ? (
              <Card className="p-6 glass border-candy-pink/30 sticky top-4">
                <h3 className="text-lg font-bold text-foreground mb-4">Enquiry Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="text-foreground font-medium">{selectedEnquiry.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <p className="text-foreground">{selectedEnquiry.email}</p>
                  </div>
                  {selectedEnquiry.phone && (
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="text-foreground">{selectedEnquiry.phone}</p>
                    </div>
                  )}
                  {selectedEnquiry.company && (
                    <div>
                      <span className="text-muted-foreground">Company:</span>
                      <p className="text-foreground">{selectedEnquiry.company}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Subject:</span>
                    <p className="text-foreground capitalize">{selectedEnquiry.subject}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p className="text-foreground">
                      {new Date(selectedEnquiry.created_at).toLocaleString("en-GB")}
                    </p>
                  </div>
                  {selectedEnquiry.source_page && (
                    <div>
                      <span className="text-muted-foreground">Source:</span>
                      <p className="text-foreground text-xs break-all">{selectedEnquiry.source_page}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div className="mt-1">{statusBadge(selectedEnquiry.status)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Message:</span>
                    <p className="text-foreground mt-1 whitespace-pre-wrap bg-muted/20 rounded-lg p-3">
                      {selectedEnquiry.message}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-candy-cyan/30 text-candy-cyan hover:bg-candy-cyan/10"
                    onClick={() => updateStatus(selectedEnquiry.id, "read")}
                    disabled={selectedEnquiry.status === "read"}
                  >
                    Mark Read
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/10"
                    onClick={() => updateStatus(selectedEnquiry.id, "replied")}
                    disabled={selectedEnquiry.status === "replied"}
                  >
                    Mark Replied
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 glass border-border">
                <p className="text-muted-foreground text-center">Select an enquiry to view details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
