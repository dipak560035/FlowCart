
                <Zap size={14} className="text-[#080808]" fill="#080808" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Flow<span className="text-[#e8ff47]">Cart</span>
              </span>
            </div>
            <p className="text-[#555] text-sm leading-relaxed mb-6 max-w-[200px]">
              Premium lifestyle tech, curated for people who care about quality.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_ICONS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#555] hover:text-white hover:bg-[#222] transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-display font-bold text-white text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#555] hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#1a1a1a] pt-8">
          <p className="text-[#333] text-xs">
            © 2025 FlowCart. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
              <span key={method} className="text-[#333] text-xs font-medium">{method}</span>
            ))}
          </div>
          <p className="text-[#333] text-xs">
            Made with ♥ for people who care
          </p>
        </div>
      </div>
    </footer>
  );
}
              {SOCIAL_ICONS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#555] hover:text-white hover:bg-[#222] transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-display font-bold text-white text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#555] hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

















































// import { Zap, Globe, Mail, GitFork, Rss } from "lucide-react";

// const FOOTER_LINKS = {
//   Products: ["Audio", "Computing", "Wearables", "Workspace", "New Arrivals"],
//   Company: ["About Us", "Careers", "Blog", "Press", "Partners"],
//   Support: ["Help Center", "Shipping", "Returns", "Warranty", "Track Order"],
//   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
// };

// const SOCIAL_ICONS = [
//   { icon: Globe, label: "Website" },
//   { icon: Mail, label: "Email" },
//   { icon: GitFork, label: "GitHub" },
//   { icon: Rss, label: "Blog" },
// ];

// export default function Footer() {
//   return (
//     <footer className="border-t border-[#1a1a1a] pt-16 pb-8 mt-0">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
//           {/* Brand */}
//           <div className="col-span-2">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-7 h-7 bg-[#e8ff47] rounded flex items-center justify-center">
//                 <Zap size={14} className="text-[#080808]" fill="#080808" />
//               </div>
//               <span className="font-display font-bold text-lg text-white">
//                 Flow<span className="text-[#e8ff47]">Cart</span>
//               </span>
//             </div>
//             <p className="text-[#555] text-sm leading-relaxed mb-6 max-w-[200px]">
//               Premium lifestyle tech, curated for people who care about quality.
//             </p>
//             <div className="flex items-center gap-3">
//               {SOCIAL_ICONS.map(({ icon: Icon, label }) => (
//                 <a
//                   key={label}
//                   href="#"
//                   aria-label={label}
//                   className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#555] hover:text-white hover:bg-[#222] transition-all duration-200"
//                 >
//                   <Icon size={14} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Links */}
//           {Object.entries(FOOTER_LINKS).map(([section, links]) => (
//             <div key={section}>
//               <h4 className="font-display font-bold text-white text-sm mb-4">{section}</h4>
//               <ul className="space-y-2.5">
//                 {links.map((link) => (
//                   <li key={link}>
//                     <a href="#" className="text-[#555] hover:text-white transition-colors text-sm">
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Bottom bar */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#1a1a1a] pt-8">
//           <p className="text-[#333] text-xs">
//             © 2025 FlowCart. All rights reserved.
//           </p>
//           <div className="flex items-center gap-6">
//             {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
//               <span key={method} className="text-[#333] text-xs font-medium">{method}</span>
//             ))}
//           </div>
//           <p className="text-[#333] text-xs">
//             Made with ♥ for people who care
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
