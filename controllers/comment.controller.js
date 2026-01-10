import Comment from "../models/comment.model.js"

/**
 * Controller to create a commetn
 */
export const createComment = async (req, res) => {
    const commentObj={
        content: req.body.content,
        ticketId: req.params.ticketId,
        commenterId:  req.userId
    }

    try {
        //Create a comment
        const comment = await Comment.create(commentObj)
        return res.status(201).json({
            success: true,
            message: 'Creating Comment successfully',
            data: comment
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while creating a comment',
            error: error.message
        })
    }


}

/**
 * Get the comments for the given ticketId
 */
export const getComments = async (req, res) => {
    try {
        const comment = await Comment.find({
            ticketId: req.params.ticketId
        });

        if (!comment){
            return res.status(400).json({
                success: false,
                message: 'Comment not found!'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Comment fetched successfully',
            data: comment
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching the comments',
            error: error.message
        })
    }
}