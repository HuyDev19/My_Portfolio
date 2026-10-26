import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [step, setStep] = useState(0);
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // Thêm trạng thái loading web
  
  const fullText = "Huynh Nhat Huy Portfolio";

  useEffect(() => {
    // Trình tự Animation (Choreography)
    
    // Bước 1: Sau 0.5s, chuột bay vào ô search
    const t1 = setTimeout(() => setStep(1), 500); 
    
    // Bước 2: Chuột click vào ô search, viền ô search sáng lên
    const t2 = setTimeout(() => {
      setIsFocused(true);
      setStep(2);
    }, 1500); 

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    // Bước 3: Gõ chữ
    if (step === 2) {
      let i = 0;
      const typeInterval = setInterval(() => {
        setText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(typeInterval);
          // Gõ xong thì chờ 0.5s rồi qua bước tiếp theo
          setTimeout(() => setStep(3), 500);
        }
      }, 70); // Tốc độ gõ 70ms/chữ
      return () => clearInterval(typeInterval);
    }
  }, [step]);

  useEffect(() => {
    // Bước 4: Di chuyển chuột xuống nút Google Search
    if (step === 3) {
      setTimeout(() => setStep(4), 800); 
    }
    // Bước 5: Click nút Search & Hiệu ứng Loading
    if (step === 4) {
      setTimeout(() => {
        setIsClicked(true); // Mô phỏng nhấn nút
        
        // 100ms sau khi nhấn, thanh Loading Bar màu xanh xuất hiện ở góc trên
        setTimeout(() => setIsSearching(true), 100);

        // Thanh loading chạy siêu tốc trong 400ms, sau đó lập tức chuyển cảnh
        setTimeout(() => setStep(5), 500); 
      }, 400); 
    }
  }, [step]);

  // Khi step === 5, ta unmount (thoát) màn hình này bằng AnimatePresence
  const isLoading = step < 5;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 4, // Phóng to cực đại, cảm giác xé rách màn hình nhanh hơn
            filter: "blur(15px)",
            transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } // Tăng tốc độ chuyển cảnh lên gấp đôi
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center pt-[20vh] bg-[#202124] font-sans overflow-hidden"
        >
          {/* ─── THANH LOADING CHROME GIẢ LẬP ─── */}
          {isSearching && (
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-[3px] bg-[#8ab4f8] z-[999999] shadow-[0_0_8px_#8ab4f8]"
            />
          )}

          {/* Logo Google đa sắc */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <svg viewBox="0 0 272 92" width="272" height="92" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S81 39.2 81 47.18c0 7.9 5.79 13.44 12.51 13.44s12.5-5.55 12.5-13.44z"/>
              <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.86 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.5 5.46-12.5 13.44c0 7.9 5.79 13.44 12.5 13.44s12.51-5.55 12.51-13.44z"/>
              <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
              <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
              <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
              <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.01z"/>
            </svg>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`flex items-center w-full max-w-[584px] h-[48px] px-4 rounded-full border transition-colors duration-300 ${isFocused ? 'bg-[#303134] border-[#8ab4f8] shadow-[0_1px_6px_rgba(32,33,36,0.28)]' : 'bg-[#202124] border-[#5f6368] hover:bg-[#303134] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)]'}`}
          >
            {/* Kính lúp */}
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-[#9aa0a6] mr-3">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>

            {/* Khung gõ Text */}
            <div className="flex-1 text-[16px] text-[#e8eaed] font-normal leading-[48px] outline-none">
              {text}
              {/* Con trỏ nhấp nháy */}
              {isFocused && step < 5 && (
                <span className="inline-block w-[1.5px] h-[18px] bg-[#e8eaed] align-middle animate-pulse ml-[1px]" />
              )}
            </div>

            {/* Mic Icon giả */}
            <svg className="w-6 h-6 ml-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285f4" d="M12 15c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v7c0 1.66 1.34 3 3 3z"></path>
              <path fill="#34a853" d="M11 18.92h2V22h-2z"></path>
              <path fill="#fbbc04" d="M7 12H5c0 1.93.78 3.68 2.05 4.95l1.41-1.41C7.56 14.63 7 13.38 7 12z"></path>
              <path fill="#ea4335" d="M12 17c-1.38 0-2.63-.56-3.54-1.47l-1.41 1.41A6.99 6.99 0 0 0 12.01 19c3.87 0 6.98-3.14 6.98-7h-2c0 2.76-2.23 5-4.99 5z"></path>
            </svg>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-3 mt-8"
          >
            <motion.button 
              animate={isClicked ? { scale: 0.95, backgroundColor: "#4f5155" } : {}}
              className="bg-[#303134] text-[#e8eaed] border border-[#303134] rounded-md px-4 py-2 text-sm hover:border-[#5f6368] focus:outline-none"
            >
              Google Search
            </motion.button>
            <button className="bg-[#303134] text-[#e8eaed] border border-[#303134] rounded-md px-4 py-2 text-sm hover:border-[#5f6368] focus:outline-none">
              I'm Feeling Lucky
            </button>
          </motion.div>

          {/* ─── CON TRỎ CHUỘT GIẢ (FAKE MOUSE) ─── */}
          {/* Vị trí ban đầu: giấu ngoài màn hình (bottom right) */}
          <motion.div
            initial={{ x: "50vw", y: "50vh" }}
            animate={{
              // Bước 1: bay tới ô search. Bước 3: bay tới nút search.
              x: step >= 3 ? "-50px" : step >= 1 ? "0px" : "50vw",
              y: step >= 3 ? "235px" : step >= 1 ? "145px" : "50vh",
              scale: isClicked ? 0.8 : 1 // Thu nhỏ khi click
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.5
            }}
            className="absolute z-50 drop-shadow-md origin-top-left"
          >
            {/* SVG Con trỏ chuột macOS */}
            <svg width="28" height="38" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.5 3.21z" fill="black" stroke="white" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
