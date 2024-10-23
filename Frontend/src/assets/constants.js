const konstante = {
    API_URL: "https://kukac194-001-site1.jtempurl.com/api",
    SITE: "https://kukac194-001-site1.jtempurl.com",
    SWAGGER: "https://kukac194-001-site1.jtempurl.com/swagger/index.html",

    IGRICE: {
        SVE_IGRICE: "/igrice",
        IGRICA_ID: "/igrice/:id",
        AZURIRAJ_IGRICU: "/azuriraj-igricu/:id",
        NOVA_IGRICA: "/nova-igrica",
        PROIZVODACI: "/proizvodaci/:id/igrice"
    },

    PROIZVODACI: {
        SVI_PROIZVODACI: "/proizvodaci",
        PROIZVODACI_DRZAVE: "/proizvodaci/drzave/:id",
        NOVI_PROIZVODAC: "/proizvodaci/dodaj-proizvodaca",
        AZURIRAJ_PROIZVODACA: "/proizvodaci/:id/azuriraj"
    },

    DRZAVE: {
        SVE_DRZAVE: "/drzave",
        NOVA_DRZAVA: "/drzave/dodaj-drzavu",
        AZURIRAJ_DRZAVU: "/drzave/:id/azuriraj"
    },
    
}

export default konstante;