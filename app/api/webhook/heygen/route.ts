import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("HeyGen Webhook received:", body);

    const { event_type, event_data } = body;

    // Check if event is video completion
    if (event_type === 'avatar_video.complete') {
      const { video_id, url, callback_id } = event_data;
      
      // callback_id is our request ID (book_requests.id)
      if (callback_id && url) {
        
        // Update Supabase
        const { error } = await supabase
          .from('book_requests')
          .update({ 
            video_url: url,
            video_status: 'completed'
          })
          .eq('id', callback_id);

        if (error) {
           console.error('Webhook Supabase Error:', error);
           
           // Fallback update user_data if columns don't exist
           // Fetch current data first
           const { data: currentData } = await supabase
             .from('book_requests')
             .select('user_data')
             .eq('id', callback_id)
             .single();
             
           if (currentData) {
             const updatedUserData = {
               ...currentData.user_data,
               video_url: url,
               video_status: 'completed'
             };
             
             await supabase
               .from('book_requests')
               .update({ user_data: updatedUserData })
               .eq('id', callback_id);
           }
        }
      }
    } else if (event_type === 'avatar_video.fail') {
       const { callback_id, error_message } = event_data;
       if (callback_id) {
         await supabase
          .from('book_requests')
          .update({ video_status: 'failed' }) // or update user_data similarly
          .eq('id', callback_id);
          
          // Fallback logic similar to above...
       }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
